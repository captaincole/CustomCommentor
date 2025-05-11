import nock from "nock";
import myProbotApp from "../src/index.js";
import { Probot, ProbotOctokit } from "probot";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { describe, beforeEach, afterEach, test, expect } from "vitest";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const privateKey = fs.readFileSync(
  path.join(__dirname, "fixtures/mock-cert.pem"),
  "utf-8",
);

describe("Custom Commentor", () => {
  let probot: any;

  beforeEach(() => {
    nock.disableNetConnect();
    probot = new Probot({
      appId: 123,
      privateKey,
      // disable request throttling and retries for testing
      Octokit: ProbotOctokit.defaults({
        retry: { enabled: false },
        throttle: { enabled: false },
      }),
    });
    // Load our app into probot
    probot.load(myProbotApp);
  });

  test("creates a comment when a pull request is opened", async () => {
    // Create a PR payload
    const payload = {
      action: "opened",
      pull_request: {
        number: 1,
        user: {
          login: "test-user"
        }
      },
      repository: {
        name: "testing-things",
        owner: {
          login: "test-owner"
        }
      },
      installation: {
        id: 2
      }
    };

    // Mock GitHub API
    const mock = nock("https://api.github.com")
      // Test that we correctly return a test token
      .post("/app/installations/2/access_tokens")
      .reply(200, {
        token: "test",
        permissions: {
          pull_requests: "write",
        },
      })
      // Test that a comment is posted with the expected message
      .post("/repos/test-owner/testing-things/issues/1/comments", (body: any) => {
        expect(body).toMatchObject({ 
          body: "Thanks for opening this pull request, @test-user! 👍\n\nYour contribution is appreciated and will be reviewed soon." 
        });
        return true;
      })
      .reply(200);

    // Receive a webhook event
    await probot.receive({ name: "pull_request", payload });

    expect(mock.pendingMocks()).toStrictEqual([]);
  });

  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });
});