import { render, screen, fireEvent } from "@testing-library/react";
import { Search } from ".";

describe("Search", () => {
  it("should render", () => {
    render(<Search onSearch={() => {}} />);
    const searchInput = screen.getByRole("textbox");
    const searchButton = screen.getByRole("button");
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  it("should call onSearch when search button is clicked", () => {
    const onSearch = jest.fn();
    render(<Search onSearch={onSearch} />);
    const searchInput = screen.getByRole("textbox");
    const searchButton = screen.getByRole("button");

    fireEvent.change(searchInput, { target: { value: "test" } });
    fireEvent.click(searchButton);

    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith("test");
  });
});
