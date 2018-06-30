const axios = require("axios");

const gitHubRepositories = process.env.GitHubRepositories.replace(/ /g,'').split(',');
const gitHubAuthorList = process.env.GitHubAuthors.replace(/ /g,'').split(',');
const gitHubAccessToken = process.env.GitHubAccessToken;

async function getPullRequests() {
  const promises = gitHubRepositories.map(repository =>
    axios.get(`https://api.github.com/repos/homechef/${repository}/pulls?access_token=${gitHubAccessToken}`));

  const pullRequestResponses = await Promise.all(promises);

  const filteredPullRequests = pullRequestResponses.map(pullRequestResponse => {
    return pullRequestResponse.data.filter(pullRequest => {
      var pullRequestAuthor = pullRequest.user.login;
      return gitHubAuthorList.includes(pullRequestAuthor);
   });
  });

  const pullRequests = [].concat(...filteredPullRequests);
  return pullRequests;
}

module.exports = getPullRequests;
