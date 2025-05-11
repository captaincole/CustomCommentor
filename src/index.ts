import { Probot } from "probot";
import fs from "fs";

// Read private key from file path if specified in environment
if (process.env.PRIVATE_KEY_PATH) {
  try {
    const keyfile = process.env.PRIVATE_KEY_PATH;
    if (fs.existsSync(keyfile)) {
      process.env.PRIVATE_KEY = fs.readFileSync(keyfile, "utf8");
      console.log(`Loaded private key from ${keyfile}`);
    }
  } catch (error) {
    console.error("Error loading private key from file:", error);
  }
}

export default (app: Probot) => {
  // Listen for pull request opened events
  app.on("pull_request.opened", async (context) => {
    // Get the pull request data
    const pr = context.payload.pull_request;
    
    // Create a friendly comment
    const comment = context.issue({
      body: `Thanks for opening this pull request, @${pr.user.login}! 👍\n\nYour contribution is appreciated and will be reviewed soon.`
    });
    
    // Post the comment on the pull request
    await context.octokit.issues.createComment(comment);
  });
};