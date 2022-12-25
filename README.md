# discord-feed-worker

[![CI](https://github.com/InkoHX/discord-feed-worker/actions/workflows/ci.yml/badge.svg)](https://github.com/InkoHX/discord-feed-worker/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/InkoHX/discord-feed-worker/branch/main/graph/badge.svg?token=PH7GI3DLM2)](https://codecov.io/gh/InkoHX/discord-feed-worker)

Send feed content to Discord using Cloudflare Workers.

## Supports

- RSS
- Atom
- JSON Feed

Thanks [`@extractus/feed-extractor`](https://github.com/extractus/feed-extractor)

## Deploy

```sh
# Clone this repo
git clone https://github.com/InkoHX/discord-feed-worker.git
cd ./discord-feed-worker

# Install dependencies.
pnpm i --frozen-lockfile

# Required
echo "Following feed url" | npx wrangler secret put "FEED_URL"
echo "Your discord bot token here" | npx wrangler secret put "DISCORD_TOKEN"
echo "Your text channel id here" | npx wrangler secret put "CHANNEL_ID"

# Optional
# The `CROSSPOST` option can only be enabled if the channel specified by `CHANNEL_ID` is an announcement channel.
# echo "ON" | npx wrangler secret put "CROSSPOST"
# If the `CREATE_THREAD` option is enabled, a thread will be created for the feed you send.
# echo "ON" | npx wrangler secret put "CREATE_THREAD"

# Deploy
pnpm run deploy
```

## Development

```sh
# Install dependencies.
pnpm i --frozen-lockfile

# Create local.env
cp ./local.env.example ./local.env

# Launch dev server
pnpm run dev
```

## FAQ

### Can I change from every 3 hours to every n hours?

Yes, as an example, to change every hour, rewrite `triggers.crons` in `wrangler.toml` as `0 * * * *` and replace `10_800_000` set in the date constant in `src/index.ts` with `3_600_000`.

### What permissions must I give my Discord bot?

`Read Messages/View Channels` and `Send Messages` are required, but additional permissions are needed depending on the options you enable (e.g., `CROSSPOST`).

| Options       | Require permissions    |
| ------------- | ---------------------- |
| CROSSPOST     | `Manage Messages`      |
| CREATE_THREAD | `Create Public Thread` |

## Author

- [InkoHX](https://github.com/InkoHX)

## LICENSE

```text
MIT License

Copyright (c) 2022 InkoHX

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
