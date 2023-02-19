import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Workout from ".";

describe("basic qualifications", () => {
  beforeEach(() => {
    render(<Workout />, { wrapper: BrowserRouter });
  });

  test("should have a button", () => {
    // have a submit button
    expect(screen.getAllByRole("button").length).toBe(1);
  });

  test("should have 2 inputs", () => {
    // have an input with type="text"
    expect(screen.getAllByRole("textbox").length).toBe(1);

    // have an input with type="number"
    expect(screen.getAllByRole("spinbutton").length).toBe(1);
  });

  test("should add a new workout", async () => {
    const user = userEvent.setup();

    await user.click(screen.getByRole("textbox"));
    user.keyboard("test");

    await user.click(screen.getByRole("spinbutton"));
    user.keyboard("2");

    await user.click(screen.getByRole("button", { name: /Add Workout/i }));

    // label workout that is rendered with
    // data-testid="list-item"
    expect(screen.getByTestId("list-item")).toBeInTheDocument();
  });

  test("should not add empty name workout", async () => {
    const user = userEvent.setup();

    await user.click(screen.getByRole("spinbutton"));
    user.keyboard("2");

    await user.click(screen.getByRole("button", { name: /Add Workout/i }));

    expect(screen.queryByRole("list-item")).toBe(null);
  });

  test("should not add 0 weight workout", async () => {
    const user = userEvent.setup();

    await user.click(screen.getByRole("textbox"));
    user.keyboard("test");

    await user.click(screen.getByRole("button", { name: /Add Workout/i }));

    expect(screen.queryByRole("list-item")).toBe(null);
  });

  test("should not add negative weight workout", async () => {
    const user = userEvent.setup();

    await user.click(screen.getByRole("textbox"));
    user.keyboard("test");

    await user.click(screen.getByRole("spinbutton"));
    user.keyboard("-1");

    await user.click(screen.getByRole("button", { name: /Add Workout/i }));

    expect(screen.queryByRole("list-item")).toBe(null);
  });

  test("should delete item", async () => {
    const user = userEvent.setup();

    await user.click(screen.getByRole("textbox"));
    user.keyboard("test");

    await user.click(screen.getByRole("spinbutton"));
    user.keyboard("2");

    await user.click(screen.getByRole("button", { name: /Add Workout/i }));

    expect(screen.getByTestId("list-item")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "x" }));

    expect(screen.queryByRole("list-item")).toBe(null);
  });

  test("should increment existing workout by 5", async () => {
    const user = userEvent.setup();

    await user.click(screen.getByRole("textbox"));
    user.keyboard("test");

    await user.click(screen.getByRole("spinbutton"));
    user.keyboard("1");

    await user.click(screen.getByRole("button", { name: /Add Workout/i }));

    expect(screen.getByTestId("list-item")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /\+/i }));

    expect(screen.getByText(/6/i)).toBeInTheDocument();
  });

  test("should decrement existing workout by 5", async () => {
    const user = userEvent.setup();

    await user.click(screen.getByRole("textbox"));
    user.keyboard("test");

    await user.click(screen.getByRole("spinbutton"));
    user.keyboard("10");

    await user.click(screen.getByRole("button", { name: /Add Workout/i }));

    expect(screen.getByTestId("list-item")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /\-/i }));

    expect(screen.getByText(/5/i)).toBeInTheDocument();
  });

  test("should decrement existing workout by 5, no negatives", async () => {
    const user = userEvent.setup();

    await user.click(screen.getByRole("textbox"));
    user.keyboard("test");

    await user.click(screen.getByRole("spinbutton"));
    user.keyboard("3");

    await user.click(screen.getByRole("button", { name: /Add Workout/i }));

    expect(screen.getByTestId("list-item")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /\-/i }));

    expect(screen.getByText(/3/i)).toBeInTheDocument();
  });

  test("should convert to kg/lb", async () => {
    const user = userEvent.setup();

    await user.click(screen.getByRole("textbox"));
    user.keyboard("test");

    await user.click(screen.getByRole("spinbutton"));
    user.keyboard("1");

    await user.click(screen.getByRole("button", { name: /Add Workout/i }));

    // default to lb 🇺🇸
    expect(screen.getByText(/lb/i));

    await user.click(screen.getByTestId("list-item"));

    expect(screen.findByText(/kg/i));
  });
});

