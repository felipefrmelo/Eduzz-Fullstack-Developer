import React from "react";

export interface User {
  name: string;
  username: string;
  company: string;
  location: string;
  blog: string;
  followers: number;
  following: number;
  public_repos: number;
  public_gists: number;
  avatar_url: string;
}

interface ProfileProps {
  user: User;
}

export function Profile({ user }: ProfileProps) {
  return (
    <div>
      <img src={user.avatar_url} alt={user.name} />
      <h1>{user.name}</h1>
      <p>{user.username}</p>
      <p>{user.company}</p>
      <p>{user.location}</p>
      <p>{user.blog}</p>
      <p>{user.followers}</p>
      <p>{user.following}</p>
      <p>{user.public_repos}</p>
      <p>{user.public_gists}</p>
    </div>
  );
}
