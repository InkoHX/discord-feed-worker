export const API_VERSION = 10

export const routes = {
  base: new URL(`https://discord.com/api/v${API_VERSION}/`),
  message: (channelId: string) =>
    new URL(`channels/${channelId}/messages`, routes.base),
  thread: (channelId: string, messageId: string) =>
    new URL(`channels/${channelId}/messages/${messageId}/threads`, routes.base),
  corsspost: (channelId: string, messageId: string) =>
    new URL(
      `channels/${channelId}/messages/${messageId}/crosspost`,
      routes.base,
    ),
} as const
