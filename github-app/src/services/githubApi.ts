export const githubApi = async (url: string) => {
  const response = await fetch(`https://api.github.com/users/${url}`);
  const data = await response.json();
  return { data };
};
