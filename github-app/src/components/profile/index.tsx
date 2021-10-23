import { Avatar, Box, Grid, Typography } from "@mui/material";
import { User } from "../../entities";


interface ProfileProps {
  user: User;
}

export function Profile({ user }: ProfileProps) {
  const renderField = (label: string, text: string) => (
    <Box my={1}>
      <Typography variant="body1">
        <strong> {label}:</strong> {text}
      </Typography>
    </Box>
  );

  const renderFieldWithLink = (label: string, text: string, link: string) => (
    <Box my={1}>
      <Typography variant="body1">
        <strong> {label}:</strong>{" "}
        <a target="_blank" href={link} rel="noreferrer">
          {text}
        </a>
      </Typography>
    </Box>
  );
  const renderFieldVert = (label: string, text: number) => (
    <Grid item xs={3}>
      <Typography variant="body2" textAlign="center">
        <strong> {label}</strong>
      </Typography>
      <Typography variant="body2" textAlign="center">
        {text}
      </Typography>
    </Grid>
  );

  return (
    <Box
      maxWidth={600}
      display="grid"
      gridTemplateColumns="repeat(auto-fit, minmax(256px, 1fr))"
      alignItems="center"
      padding={2}
    >
      <Box>
        <Avatar
          src={user.avatar_url}
          alt={user.name}
          sx={{ width: 256, height: 256 }}
        />
      </Box>
      <Box>
        <Typography variant="h3">{user.name}</Typography>
        {renderFieldWithLink("Username", user.login, user.html_url)}
        {renderField("Company", user.company)}
        {renderField("Location", user.location)}
        {renderFieldWithLink("Blog", user.blog, user.blog)}

        <Grid container spacing={2}>
          {renderFieldVert("Followers", user.followers)}
          {renderFieldVert("Following", user.following)}
          {renderFieldVert("Repos", user.public_repos)}
          {renderFieldVert("Gists", user.public_gists)}
        </Grid>
      </Box>
    </Box>
  );
}
