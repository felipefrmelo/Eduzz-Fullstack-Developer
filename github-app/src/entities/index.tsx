export interface User {
  name: string;
  login: string;
  company: string;
  location: string;
  blog: string;
  followers: number;
  following: number;
  public_repos: number;
  public_gists: number;
  avatar_url: string;
  html_url: string;
}

export interface Repository {
  name: string;
  full_name: string;
  language: string;
  html_url: string;
}
