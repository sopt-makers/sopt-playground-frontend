const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');
const prNumber = process.env.PR_NUMBER;
const token = process.env.GITHUB_TOKEN;

const reviewers = ['simeunseo', 'solar3070', 'seojisoosoo'];

const headers = {
  'Authorization': `Bearer ${token}`,
  'Accept': 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
};

const getPullRequest = async () => {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}`, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    console.error(await response.text());
    throw new Error('PR 정보를 읽어오는데 실패했어요.');
  }

  return await response.json();
};

const setReviewers = async (reviewers) => {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/requested_reviewers`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      owner,
      repo,
      pull_number: prNumber,
      reviewers,
    }),
  });

  if (!response.ok) {
    console.error(await response.text());
    throw new Error('리뷰어를 선정하는데 실패했어요.');
  }
};

async function main() {
  console.log('Setting for repo:', owner, repo, ', PR:', prNumber);

  const {
    requested_reviewers,
    user: { login: prUser },
    draft,
  } = await getPullRequest();

  if (draft) {
    console.log('Draft PR 이므로 스킵할게요.');
    return;
  }

  const existingReviewers = requested_reviewers.map((reviewer) => reviewer.login);

  if (existingReviewers.length > 0) {
    console.log('이미 리뷰어가 지정되어 있으므로 스킵할게요.');
    return;
  }

  const pickableUsers = reviewers.filter((user) => user !== prUser);

  const selectedReviewer = pickableUsers[Math.floor(Math.random() * pickableUsers.length)];

  await setReviewers([selectedReviewer]);

  console.log(`리뷰어 지정을 완료했어요. (${selectedReviewer})`);
}

main();
