# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Custom-Commentor is a GitHub App built with Probot that automatically comments on pull requests when they're opened. It posts a friendly message thanking the contributor for their submission.

## Core Architecture

- Built on [Probot](https://github.com/probot/probot), a framework for building GitHub Apps
- Listens for the `pull_request.opened` event and responds with a comment
- TypeScript-based implementation
- Tests using Vitest and Nock for mocking HTTP requests

## Key Commands

```bash
# Install dependencies
npm install

# Build the application (compiles TypeScript to JavaScript)
npm run build

# Run the tests
npm test

# Start the bot locally
npm start
```

## Development Workflow

1. Make changes to the source files in the `src/` directory
2. Build the project with `npm run build`
3. Run tests with `npm test`
4. Start the bot with `npm start`

## Docker Usage

```bash
# Build container
docker build -t custom-commentor .

# Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> custom-commentor
```

## Project Structure

- `src/index.ts`: Main application code that defines event handlers for GitHub events
- `test/`: Contains test files and fixtures
  - `test/index.test.ts`: Main test file with test cases
  - `test/fixtures/`: Contains mock data used in tests

## Configuration

The app's GitHub permissions and event subscriptions are defined in `app.yml`. Currently, the app:
- Subscribes to `pull_request` events
- Has read access to repository metadata
- Has write access to pull requests and issues (for commenting)