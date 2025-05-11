# custom-commentor

> A GitHub App built with [Probot](https://github.com/probot/probot) that comments on pull requests when they're opened

This simple app automatically adds a friendly comment to pull requests when they're opened, thanking contributors for their submissions.

## Setup

```sh
# Install dependencies
npm install

# Build the TypeScript code
npm run build

# Run the bot
npm start
```

## Docker

```sh
# 1. Build container
docker build -t custom-commentor .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> custom-commentor
```

## Environment Variables

You'll need to set these environment variables:

- `APP_ID`: The ID of your GitHub App
- `PRIVATE_KEY`: The private key of your GitHub App
- `WEBHOOK_SECRET`: The webhook secret of your GitHub App (optional)
- `PORT`: The port to run the server on (default: 3000)

## Development

For local development, you can use:

```sh
# Run the bot locally
npm start

# Run tests
npm test
```

## Contributing

If you have suggestions for how custom-commentor could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2025 Andrew Cole