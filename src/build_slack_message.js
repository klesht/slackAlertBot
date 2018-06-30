function buildSlackMessage(pullRequests) {
  const sortedPullRequests = pullRequests.sort(dynamicSort("created_at"))

  return JSON.stringify({
    text: '👋 How great was stand today? How about we keep the momentum going and review some of these PRs!',
    attachments: sortedPullRequests.map(item => ({
      'footer': setFooterMessage(item.created_at),
      'author_name': item.user.login,
      'title': item.title,
      'title_link': item.html_url,
      'color': setColor(item.created_at)
    }))
  })
}

function setColor(itemCreatedAt) {
  var timeStale = deriveTimeStale(itemCreatedAt);

  switch(true) {
    case (timeStale < 2):
      return "#248823";
      break;

    case (timeStale < 4):
      return "#ffbf00"
      break;

    default:
      return "#d3222e";
  }
}

function setFooterMessage(itemCreatedAt) {
  var timeStale = deriveTimeStale(itemCreatedAt);

  switch(true) {
    case (timeStale < 2):
      break;

    case (timeStale < 4):
      return "This one would be great to move forward.  It's been open for " + timeStale + " days.";
      break;

    default:
      return "Holy cow, this PR has been open for " + timeStale + " days!";
  }
}

function deriveTimeStale(itemCreatedAt) {
  var createdAt = new Date(itemCreatedAt);
  var timeNow = new Date();

  return Math.round((timeNow-createdAt)/(1000*60*60*24));
}

function dynamicSort(property) {
  var sortOrder = 1;

  if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }
  return function (a,b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
  }
}

module.exports = buildSlackMessage;
