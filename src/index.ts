import { extract } from '@extractus/feed-extractor'
import { isEnabled } from './env'
import * as discord from './discord'

export interface Env {
  DISCORD_TOKEN?: string
  CHANNEL_ID?: string
  CROSSPOST?: string
  CREATE_THREAD?: string
  FEED_URL?: string
}

export default {
  async scheduled(
    controller: ScheduledController,
    { CHANNEL_ID, DISCORD_TOKEN, CROSSPOST, CREATE_THREAD, FEED_URL }: Env,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _context: Pick<ExecutionContext, 'waitUntil'>,
  ): Promise<void> {
    if (!CHANNEL_ID)
      throw new Error('The "CHANNEL_ID" is not in the environment variable.')
    if (!DISCORD_TOKEN)
      throw new Error('The "DISCORD_TOKEN" is not in the environment variable.')
    if (!FEED_URL)
      throw new Error('The "FEED_URL" is not in the environment variable.')

    const date = new Date(controller.scheduledTime - 10_800_000) // 3 hours ago
    const fetcher = discord.fetcher(DISCORD_TOKEN)
    const entries = (await extract(FEED_URL)).entries?.filter(({ published }) => {
      return published && new Date(published) > date
    })

    if (!entries) throw new TypeError('"entries" is undefined.')

    for (const { published, title, link } of entries) {
      const response = await fetcher(
        discord.routes.message(CHANNEL_ID).toString(),
        {
          body: JSON.stringify({
            content: [
              `**${title ?? 'No title'}**が<t:${Math.floor(
                new Date(published!).getTime() / 1_000,
              )}>に更新されました。`,
              '',
              link,
            ].join('\n'),
            allowed_mentions: {
              parse: [],
            },
          }),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (!response.ok) {
        console.error(
          [
            'Failed to send message.',
            '',
            'Causes may include the following:',
            '1. Missing "Read Messages/View Channels" and "Send Messages" permissions',
            '2. Specified channel does not exist',
          ].join('\n'),
        )
        console.error('HTTP Code:', response.status)
        console.error('Response body:', await response.json())

        continue
      }

      const { id } = await response.json<{ id: string }>()

      if (isEnabled(CROSSPOST)) {
        const response = await fetcher(
          discord.routes.corsspost(CHANNEL_ID, id).toString(),
          {
            method: 'POST',
          },
        )

        if (!response.ok) {
          console.error(
            [
              'Failed to crosspost message.',
              '',
              'Causes may include the following:',
              '1. Missing "Manage Messages" permission',
              '2. Channel is not Announcement Channel',
            ].join('\n'),
          )
          console.error('HTTP Code:', response.status)
          console.error('Response body:', await response.json())
        }
      }

      if (isEnabled(CREATE_THREAD)) {
        const response = await fetcher(
          discord.routes.thread(CHANNEL_ID, id).toString(),
          {
            body: JSON.stringify({ name: title }),
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )

        if (!response.ok) {
          console.error(
            [
              'Failed to create thread.',
              '',
              'Causes may include the following:',
              '1. Missing "Create Public Threads" permission',
            ].join('\n'),
          )
          console.error('HTTP Code:', response.status)
          console.error('Response body:', await response.json())
        }
      }
    }
  },
}
