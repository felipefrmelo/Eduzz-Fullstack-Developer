import { useState, createContext } from "react";
import { Repository, User } from "../entities";

interface GithubProviderProps {
  children: React.ReactNode;
  fetchGitApi: (url: string) => Promise<{
    data: any;
  }>;
}

export interface GithubProviderState {
  state: {
    loading: boolean;
    user: User | null;
    repos: Repository[];
    starred: Repository[];
  };
  getUser: (username: string) => Promise<void>;
  getRepos: (username: string) => Promise<void>;
  getStarred: (username: string) => Promise<void>;
}

export const GithubContext = createContext<GithubProviderState>(
  {} as GithubProviderState
);

export const GithubProvider = ({
  children,
  fetchGitApi,
}: GithubProviderProps) => {
  const [state, setState] = useState({
    loading: false,
    user: null,
    repos: [],
    starred: [],
  });

  const getUser = async (username: string) => {
    const response = await fetchGitApi(username);
    const data = await response.data;
    setState({ ...state, user: data });
  };

  const getRepos = async (username: string) => {
    const response = await fetchGitApi(`${username}/repos`);
    const data = await response.data;
    setState({ ...state, repos: data });
  };

  const getStarred = async (username: string) => {
    const response = await fetchGitApi(`${username}/starred`);
    const data = await response.data;
    setState({ ...state, starred: data });
  };

  const wrapperLoading =
    (fn: (...args: any) => Promise<void>) =>
    async (...args: any) => {
      setState({ ...state, loading: true });
      await fn(...args);
      setState({ ...state, loading: false });
    };

  return (
    <GithubContext.Provider
      value={{
        state,
        getUser: wrapperLoading(getUser),
        getRepos: wrapperLoading(getRepos),
        getStarred: wrapperLoading(getStarred),
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

// const response = await fetch(
//     `https://api.github.com/users/${username}/starred`
//   );
