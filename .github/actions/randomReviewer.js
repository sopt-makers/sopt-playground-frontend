const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');
const prNumber = process.env.PR_NUMBER;
const token = process.env.GITHUB_TOKEN;
const currentUser = process.env.CURRENT_USER.trim();

const reviewers = ['juno7803', 'Tekiter', 'NamJwong', 'seojisoosoo'].filter((reviewer) => reviewer !== currentUser);

const headers = {
  'Authorization': `Bearer ${token}`,
  'Accept': 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
};

const getCurrentReviewers = async () => {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/requested_reviewers`, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    throw new Error('기존 PR의 reviewer 읽어오는데 실패했어요.');
  }

  const { users } = await response.json();

  return users;
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
    throw new Error('리뷰어를 선정하는데 실패했어요.');
  }
};

async function main() {
  const existingReviewers = await getCurrentReviewers();

  if (existingReviewers > 0) {
    console.log('이미 리뷰어가 지정되어 있으므로 스킵할게요.');
    return;
  }

  const pickReviewer = () => {
    const picked = reviewers[Math.floor(Math.random() * reviewers.length)];
    if (picked === currentUser) {
      return pickReviewer();
    }

    return picked;
  };

  const selectedReviewer = pickReviewer();

  await setReviewers([selectedReviewer]);

  console.log(`리뷰어 지정을 완료했어요. (${selectedReviewer})`);
}

main();
