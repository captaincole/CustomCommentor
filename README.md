# custom-commentor

> A GitHub App built with [Probot](https://github.com/probot/probot) that comments on pull requests when they're opened

This simple app automatically adds a friendly comment to pull requests when they're opened, thanking contributors for their submissions.

## Setup

```sh
# Install dependencies
npm install

# Create directory for private key
mkdir -p .data

# Save your GitHub App private key to the .data directory
# Download this from your GitHub App's settings page
cp /path/to/your/private-key.pem .data/private-key.pem

# Build the TypeScript code
npm run build

# Run the bot
npm start
```

## Docker

```sh
# 1. Build container
docker build -t custom-commentor .

# 2. Start container (with private key as file)
docker run -e APP_ID=<app-id> -e PRIVATE_KEY_PATH=/app/.data/private-key.pem -v /path/to/your/private-key.pem:/app/.data/private-key.pem custom-commentor
```

## Environment Variables

You'll need to set these environment variables in your `.env` file:

- `APP_ID`: The ID of your GitHub App
- `PRIVATE_KEY_PATH`: Path to your GitHub App's private key file (e.g., `.data/private-key.pem`)
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