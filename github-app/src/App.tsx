import { Profile, Repositories, Layout, Loading } from "./components";
import { useGithubContext } from "./providers/github-provider";
import { Typography } from "@mui/material";
import { useEffect } from "react";

function App() {
  const { state, actions } = useGithubContext();

  useEffect(() => {
    if (state.user === null) {
      actions.getUser("felipefrmelo");
    }
  });

  return (
    <Layout onSearch={actions.getUser}>
      {state.user?.login ? (
        state.loading ? (
          Loading(state.loading)
        ) : (
          <>
            <Profile user={state.user} />
            <Repositories repos={state.repos} starred={state.starred} />
          </>
        )
      ) : (
        <Typography variant="h4">No user found</Typography>
      )}
    </Layout>
  );
}

export default App;
