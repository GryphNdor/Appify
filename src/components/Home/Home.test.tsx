import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  BrowserRouter,
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom";
import Home from "./index";
import Counter from "../Counter";
import Picture from "../Picture";
import Workout from "../Workout";

describe("tests main page", () => {
  test("should render 3 buttons", async () => {
    render(<Home />, { wrapper: BrowserRouter });
    const buttons = await screen.getAllByRole("button");
    expect(buttons.length).toBe(3);
  });

  test("should change page on counter click", async () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/counter",
          element: <Counter />,
        },
      ],
      {
        initialEntries: ["/"],
        initialIndex: 0,
      }
    );
    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.click(screen.getByText(/Counter/i));

    await waitFor(() => {
      expect(router.state.location.pathname).toBe("/counter");
    });
  });

  test("should change page on picture click", async () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/picture",
          element: <Picture />,
        },
      ],
      {
        initialEntries: ["/"],
        initialIndex: 0,
      }
    );
    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.click(screen.getByText(/Picture/i));

    await waitFor(() => {
      expect(router.state.location.pathname).toBe("/picture");
    });
  });

  test("should change page on workout click", async () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/workout",
          element: <Workout />,
        },
      ],
      {
        initialEntries: ["/"],
        initialIndex: 0,
      }
    );
    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.click(screen.getByText(/Workout/i));

    await waitFor(() => {
      expect(router.state.location.pathname).toBe("/workout");
    });
  });

  test("should contain Appify title", async () => {
    render(<Home />, { wrapper: BrowserRouter });
    expect(screen.getByText("Welcome to Appify")).toBeTruthy();
  });

  test("should contain description text", async () => {
    render(<Home />, { wrapper: BrowserRouter });
    expect(
      screen.getByText(
        "There are plenty of basic applications that we use in everyday life. The Goal of Appify is to makes mini-apps that help take care of those tasks."
      )
    ).toBeTruthy();
  });
});
