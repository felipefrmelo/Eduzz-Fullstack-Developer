import { render, screen, fireEvent } from "@testing-library/react";

import {
  GithubProvider,
  GithubContext,
  GithubContextActions,
} from "./github-provider";

describe("GithubProvider", () => {
  let mockBuilder = (data?: any) => jest.fn(() => Promise.resolve({ data }));

  async function assertFunctionsIsCalled(
    fn: keyof GithubContextActions,
    userName: string = "test",
    url: string = "test"
  ) {
    const mockFetch = mockBuilder();
    render(
      <GithubProvider fetchGitApi={mockFetch}>
        <GithubContext.Consumer>
          {(context) => {
            return (
              <div>
                {context.state.loading ? "loading" : "not loading"}
                <button
                  onClick={() => {
                    const fnToCall = context.actions[fn];
                    return fnToCall(userName);
                  }}
                >
                  Get
                </button>
              </div>
            );
          }}
        </GithubContext.Consumer>
      </GithubProvider>
    );

    fireEvent.click(screen.getByText("Get"));
    const username = await screen.findByText("loading");
    expect(username).toBeInTheDocument();
    expect(mockFetch).toHaveBeenCalledWith(url);
  }

  it("should have a default values in the context", () => {
    render(
      <GithubProvider fetchGitApi={mockBuilder()}>
        <GithubContext.Consumer>
          {(context) => {
            expect(context).toEqual({
              state: {
                loading: false,
                repos: [],
                starred: [],
                user: null,
              },

              actions: {
                getRepos: expect.any(Function),
                getStarred: expect.any(Function),
                getUser: expect.any(Function),
              },
            });
            return null;
          }}
        </GithubContext.Consumer>
      </GithubProvider>
    );
  });

  it("should set loading to true when getUser is called", async () => {
    await assertFunctionsIsCalled("getUser");
  });

  it("should set loading to true when getRepos is called", async () => {
    await assertFunctionsIsCalled("getRepos", "test", "test/repos");
  });

  it("should set loading to true when getStarred is called", async () => {
    await assertFunctionsIsCalled("getStarred", "test", "test/starred");
  });

  it("should set state.user when getUser is called", async () => {
    const mockFetch = mockBuilder({ login: "test" });
    render(
      <GithubProvider fetchGitApi={mockFetch}>
        <GithubContext.Consumer>
          {(context) => {
            return (
              <div>
                {context.state.user ? context.state.user.login : "no user"}
                <button onClick={() => context.actions.getUser("test")}>
                  Get user
                </button>
              </div>
            );
          }}
        </GithubContext.Consumer>
      </GithubProvider>
    );

    fireEvent.click(screen.getByText("Get user"));
    const username = await screen.findByText("test");
    expect(username).toBeInTheDocument();
  });

  it("should set repos when getRepos is called", async () => {
    const mockFetch = mockBuilder([{ name: "test" }]);
    render(
      <GithubProvider fetchGitApi={mockFetch}>
        <GithubContext.Consumer>
          {(context) => {
            return (
              <div>
                {context.state.repos.map((repo) => repo.name)}
                <button onClick={() => context.actions.getRepos("test")}>
                  Get repos
                </button>
              </div>
            );
          }}
        </GithubContext.Consumer>
      </GithubProvider>
    );

    fireEvent.click(screen.getByText("Get repos"));
    const repos = await screen.findAllByText("test");
    expect(repos).toHaveLength(1);
  });

  it("should set starred when getStarred is called", async () => {
    const mockFetch = mockBuilder([{ name: "test" }]);
    render(
      <GithubProvider fetchGitApi={mockFetch}>
        <GithubContext.Consumer>
          {(context) => {
            return (
              <div>
                {context.state.starred.map((repo) => repo.name)}
                <button onClick={() => context.actions.getStarred("test")}>
                  Get starred
                </button>
              </div>
            );
          }}
        </GithubContext.Consumer>
      </GithubProvider>
    );

    fireEvent.click(screen.getByText("Get starred"));
    const starred = await screen.findAllByText("test");
    expect(starred).toHaveLength(1);
  });
});
