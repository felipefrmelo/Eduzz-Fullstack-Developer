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
    setState({ ...state, loading: true });
    const response = await fetchGitApi(username);
    const data = await response.data;
    setState({ ...state, loading: false, user: data });
  };

  const getRepos = async (username: string) => {
    setState({ ...state, loading: true });
    const response = await fetchGitApi(`${username}/repos`);
    const data = await response.data;
    setState({ ...state, loading: false, repos: data });
  };

  const getStarred = async (username: string) => {
    setState({ ...state, loading: true });
    const response = await fetchGitApi(`${username}/starred`);
    const data = await response.data;
    setState({ ...state, loading: false, starred: data });
  };

  return (
    <GithubContext.Provider
      value={{
        state,
        getUser,
        getRepos,
        getStarred,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

// const response = await fetch(
//     `https://api.github.com/users/${username}/starred`
//   );
