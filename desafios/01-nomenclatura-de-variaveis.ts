// Nomenclatura de variáveis

const CATEGORYS = [
  {
    title: 'User',
    followers: 5
  },
  {
    title: 'Friendly',
    followers: 50,
  },
  {
    title: 'Famous',
    followers: 500,
  },
  {
    title: 'Super Star',
    followers: 1000,
  },
]

export default async function getData(req, res) {
  const githubUsername = String(req.query.username)

  if (!githubUsername) {
    return res.status(400).json({
      message: `Please provide an username to search on the github API`
    })
  }

  const fetchGithubUsername = await fetch(`https://api.github.com/users/${githubUsername}`);

  if (fetchGithubUsername.status === 404) {
    return res.status(400).json({
      message: `User with username "${githubUsername}" not found`
    })
  }

  const data = await fetchGithubUsername.json()

  const orderCategorys = CATEGORYS.sort((a, b) =>  b.followers - a.followers); 

  const userCategory = orderCategorys.find(i => data.followers > i.followers)

  const result = {
    githubUsername,
    category: userCategory?.title
  }

  return result
}

getData({ query: {
  username: 'gallodev'
}}, {})