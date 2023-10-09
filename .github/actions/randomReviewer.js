const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');
const prNumber = process.env.PR_NUMBER;
const token = process.env.GITHUB_TOKEN;
const currentUser = process.env.CURRENT_USER;

const reviewers = ['juno7803', 'Tekiter', 'NamJwong', 'seojisoosoo'].filter((reviewer) => reviewer !== currentUser);
const selectedReviewer = reviewers[Math.floor(Math.random() * reviewers.length)];

const headers = {
  'Authorization': `Bearer ${token}`,
  'Accept': 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
};

const getReviewerResponse = () => {
  return fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/requested_reviewers`, {
    method: 'GET',
    headers,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('기존 PR의 reviewer 읽어오는데 실패했어요.');
      }
    })
    .then((json) => {
      if (json.users.length > 0) {
        throw new Error('이미 PR에 리뷰어가 선정되어 있어요.');
      }
      return null;
    });
};

const setReviewerResponse = () => {
  return fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/requested_reviewers`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      owner,
      repo,
      pull_number: prNumber,
      reviewers: [selectedReviewer],
    }),
  }).then((response) => {
    if (response.ok) {
      console.log(`${selectedReviewer}를 리뷰어로 선정했어요!`);
    } else {
      throw new Error('Failed to set reviewer');
    }
  });
};

getReviewerResponse()
  .then(setReviewerResponse)
  .catch((error) => {
    console.error('리뷰어 지정 과정에서 오류가 발생했어요.\n', error.message);
  });
