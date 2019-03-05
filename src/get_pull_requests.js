const axios = require("axios");

const gitHubRepositories = process.env.GitHubRepositories.replace(/ /g,'').split(',');
const gitHubAuthorList = process.env.GitHubAuthors.replace(/ /g,'').split(',');
const gitHubAccessToken = process.env.GitHubAccessToken;
const gitHubTeamTag = process.env.GitHubTeamTag;

async function getPullRequests() {
  const promises = gitHubRepositories.map(repository =>
    axios.get(`https://api.github.com/repos/homechef/${repository}/pulls?access_token=${gitHubAccessToken}`));

  const pullRequestResponses = await Promise.all(promises);

  const filteredPullRequests = pullRequestResponses.map(pullRequestResponse => {
    return pullRequestResponse.data.filter(pullRequest => {
      var pullRequestAuthor = pullRequest.user.login;
      return (gitHubAuthorList.includes(pullRequestAuthor) || bodyIncludesTag(pullRequest, gitHubTeamTag));
   });
  });

  const pullRequests = [].concat(...filteredPullRequests);
  return pullRequests;
}

function bodyIncludesTag(pullRequest, teamTag) {
  if (typeof teamTag === 'undefined') {
    return false;
  } else {
    return pullRequest.body.includes(teamTag);
  }
}

module.exports = getPullRequests;
