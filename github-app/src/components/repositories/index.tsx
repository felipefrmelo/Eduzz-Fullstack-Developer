import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { TabProps, Tab } from "..";
import { Chip } from "@mui/material";
import { Repository } from "../../entities";

interface RepositoriesProps {
  repos?: Repository[];
  starred?: Repository[];
}

export const Repositories = ({
  repos = [],
  starred = [],
}: RepositoriesProps) => {
  const data: TabProps = {
    tabs: [
      {
        label: "Repositories",
        children: RenderRepositoryItems(repos),
      },
      {
        label: "Starred",
        children: RenderRepositoryItems(starred),
      },
    ],
  };

  return (
    <Box data-testid="repositories" sx={{ width: "100%" }}>
      <Tab {...data} />
    </Box>
  );
};

function RenderRepositoryItems(repos: Repository[]) {
  return repos.length > 0 ? (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 2,
      }}
    >
      {repos.map((repo) => RepositoryItem(repo))}
    </Box>
  ) : (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        No repositories found
      </Typography>
    </Box>
  );
}

function RepositoryItem(repo: Repository): JSX.Element {
  return (
    <Box
      key={repo.full_name}
      sx={{
        p: 3,
        borderRadius: 2,
      }}
      boxShadow={5}
      display="flex"
      flexDirection="column"
      alignItems="baseline"
      justifyContent="space-between"
    >
      <Typography variant="h6" gutterBottom>
        {repo.name}
      </Typography>
      <Typography variant="body2" gutterBottom>
        <a target="_blank" rel="noopener noreferrer" href={repo.html_url}>
          {repo.full_name}
        </a>
      </Typography>
      <Chip size="small" label={repo.language} />
    </Box>
  );
}
