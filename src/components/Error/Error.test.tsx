import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  BrowserRouter,
  createMemoryRouter,
  RouterProvider,
} from "react-router-dom";
import Error from ".";
import Home from "../Home";

describe("tests main page", () => {
  test("should render error message", async () => {
    render(<Error />, { wrapper: BrowserRouter });
    expect(
      screen.getByText("404: Return to the Main Page")
    ).toBeInTheDocument();
  });

  test("should render go back button", async () => {
    render(<Error />, { wrapper: BrowserRouter });
    const buttons = await screen.getAllByRole("button");
    expect(buttons.length).toBe(1);
  });

  test("go back button should work", async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/error",
          element: <Error />,
        },
      ],
      {
        initialEntries: ["/error"],
        initialIndex: 0,
      }
    );

    render(<RouterProvider router={router} />);

    expect(router.state.location.pathname).toBe("/error");

    await user.click(screen.getByText(/Go Back/i));

    await waitFor(() => {
      expect(router.state.location.pathname).toBe("/");
    });
  });
});
