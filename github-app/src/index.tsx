import { CssBaseline } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { GithubProvider } from "./providers/github-provider";
import { githubApi } from "./services/githubApi";

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <GithubProvider fetchGitApi={githubApi}>
      <App />
    </GithubProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
