import { Probot } from "probot";

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