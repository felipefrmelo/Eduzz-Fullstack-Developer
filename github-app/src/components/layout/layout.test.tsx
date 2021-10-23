import { screen, render } from "@testing-library/react";
import { Layout } from ".";

describe("Layout", () => {
  const onSearch = jest.fn();

  it("renders correctly with children", () => {
    render(<Layout onSearch={onSearch}>Hello</Layout>);

    const main = screen.getByRole("main");
    expect(main).toHaveTextContent("Hello");
  });
});
