import { screen, render } from "@testing-library/react";
import { Profile } from ".";
import { User } from "../../entities";

const user: User = {
  name: "John Doe",
  login: "johndoe",
  company: "Company",
  location: "Location",
  blog: "https://blog.com",
  followers: 10,
  following: 20,
  public_repos: 30,
  public_gists: 40,
  avatar_url: "https://avatar.com",
  html_url: "https://johndoe.com",
};

describe("test profile", () => {
  test("render profile", () => {
    render(<Profile user={user} />);

    const name = screen.getByText(user.name);
    const username = screen.getByText(user.login);
    const company = screen.getByText(user.company);
    const location = screen.getByText(user.location);
    const blog = screen.getByText(user.blog);
    const followers = screen.getByText(user.followers);
    const following = screen.getByText(user.following);
    const public_repos = screen.getByText(user.public_repos);
    const public_gists = screen.getByText(user.public_gists);
    const avatar_url = screen.getByAltText(user.name);

    expect(username).toHaveAttribute("href", user.html_url);
    expect(blog).toHaveAttribute("href", user.blog);
    expect(name).toBeInTheDocument();
    expect(company).toBeInTheDocument();
    expect(location).toBeInTheDocument();
    expect(followers).toBeInTheDocument();
    expect(following).toBeInTheDocument();
    expect(public_repos).toBeInTheDocument();
    expect(public_gists).toBeInTheDocument();
    expect(avatar_url).toBeInTheDocument();
  });
});
