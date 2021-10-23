import { screen, render } from "@testing-library/react";
import { Layout } from ".";

describe("Layout", () => {
  it("renders correctly", () => {
    render(<Layout />);

    const header = screen.getByRole("search");
    expect(header).toBeInTheDocument();

    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
  });

  it("renders correctly with children", () => {
    render(<Layout>Hello</Layout>);

    const main = screen.getByRole("main");
    expect(main).toHaveTextContent("Hello");
  });
});
