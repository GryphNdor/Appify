import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import Counter from ".";
import { BrowserRouter } from "react-router-dom";

describe("basic qualifications", () => {
  test("should have a button", () => {
    render(<Counter />, { wrapper: BrowserRouter });
    expect(screen.getAllByRole("button").length).toBeGreaterThanOrEqual(1);
  });

  test("should render a counter", () => {
    render(<Counter />, { wrapper: BrowserRouter });
    expect(screen.getByText(/0/i)).toBeInTheDocument();
  });
  test("should not change text color after 10 calls", async () => {
    render(<Counter />, { wrapper: BrowserRouter });
    const user = userEvent.setup();
    let color = screen.getByText(/0/i).style.color;
    expect(screen.getByText(/0/i).style.color).not.toBe("");
  });

  test("should change text color after 10 calls", async () => {
    render(<Counter />, { wrapper: BrowserRouter });
    const user = userEvent.setup();
    let color = screen.getByText(/0/i).style.color;
    for (let i = 0; i < 10; i++) {
      await user.click(screen.getByRole("button"));
    }
    expect(screen.getByText(/10/i).style.color).not.toBe(color);
  });
});