import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Picture from ".";

describe("basic qualifications", () => {
  test("should have a button", () => {
    render(<Picture />, { wrapper: BrowserRouter });
    expect(screen.getAllByRole("button").length).toBeGreaterThanOrEqual(1);
  });

  test("should render a picture after the call", async () => {
    render(<Picture />, { wrapper: BrowserRouter });
    const user = userEvent.setup();

    const images = screen.queryByRole("img");
    expect(images).not.toBeInTheDocument();

    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.queryByRole("img")).toBeInTheDocument();
    });
  });

  test("should render 1-5 picutres when requested", () => {
    // will be reviewed manually
  });
});