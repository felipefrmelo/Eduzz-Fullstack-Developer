import faker from "faker";
import { render, screen, fireEvent } from "@testing-library/react";
import { Repositories } from ".";
import { Repository } from "../../entities";

const makeRepository = (): Repository => ({
  name: faker.random.word() + faker.datatype.uuid(),
  full_name: faker.random.word() + faker.datatype.uuid(),
  language: faker.random.words() + faker.datatype.uuid(),
  html_url: faker.internet.url(),
});

const repositories: Repository[] = [...Array(10)].map(makeRepository);

const starred: Repository[] = [...Array(10)].map(makeRepository);

describe("Repositories", () => {
  function expectRepositoryToBeInDoc(repository: Repository) {
    expect(screen.getByText(repository.name)).toBeInTheDocument();
    expect(screen.getByText(repository.full_name)).toBeInTheDocument();
    expect(screen.getByText(repository.language)).toBeInTheDocument();
  }

  it("should render", () => {
    render(<Repositories />);
    expect(screen.getByTestId("repositories")).toBeInTheDocument();
  });

  it("should render a tab with the name 'Repositories'", () => {
    render(<Repositories />);
    expect(
      screen.getByRole("tab", { name: "Repositories" })
    ).toBeInTheDocument();
  });

  it("should render a tab with the name 'Starred'", () => {
    render(<Repositories />);
    expect(screen.getByRole("tab", { name: "Starred" })).toBeInTheDocument();
  });

  it("should render a list of repositories", () => {
    render(<Repositories repos={repositories} />);

    repositories.forEach((repository) => {
      expectRepositoryToBeInDoc(repository);
    });
  });

  it("should render a list of repositories starred", () => {
    render(<Repositories repos={repositories} starred={starred} />);

    fireEvent.click(screen.getByRole("tab", { name: "Starred" }));
    starred.forEach((repository) => {
      expectRepositoryToBeInDoc(repository);
    });
  });
});
