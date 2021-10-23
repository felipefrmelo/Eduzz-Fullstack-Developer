import { useState, createContext, useContext } from "react";
import { Repository, User } from "../entities";

interface GithubProviderProps {
  children: React.ReactNode;
  fetchGitApi: (url: string) => Promise<{
    data: any;
  }>;
}

interface GithubContextState {
  user: User | null;
  repos: Repository[];
  loading: boolean;
  starred: Repository[];
}

export interface GithubContextActions {
  getUser: (username: string) => Promise<void>;
  getRepos: (username: string) => Promise<void>;
  getStarred: (username: string) => Promise<void>;
}

export interface GithubProviderContext {
  state: GithubContextState;
  actions: GithubContextActions;
}

export const GithubContext = createContext<GithubProviderContext>(
  {} as GithubProviderContext
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
    const data = response.data;
    setState((s) => ({ ...s, user: data }));
    getRepos(username);
    getStarred(username);
  };

  const getRepos = async (username: string) => {
    const response = await fetchGitApi(`${username}/repos`);
    const data = response.data;
    setState((s) => ({ ...s, repos: data }));
  };

  const getStarred = async (username: string) => {
    const response = await fetchGitApi(`${username}/starred`);
    const data = response.data;
    setState((s) => ({ ...s, starred: data }));
  };

  const wrapperLoading =
    (fn: (...args: any) => Promise<void>) =>
    async (...args: any) => {
      setState((s) => ({ ...s, loading: true }));
      await fn(...args);
      setState((s) => ({ ...s, loading: false }));
    };

  return (
    <GithubContext.Provider
      value={{
        state,
        actions: {
          getUser: wrapperLoading(getUser),
          getRepos: wrapperLoading(getRepos),
          getStarred: wrapperLoading(getStarred),
        },
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export const useGithubContext = () => {
  const context = useContext(GithubContext);
  if (!context) {
    throw new Error("useGithubContext must be used within a GithubProvider");
  }
  return context;
};
