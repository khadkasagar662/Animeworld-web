import React from "react";
import { render, screen } from "@testing-library/react";
import Activity from "../Components/Profile/Activity";

jest.mock("javascript-time-ago", () => {
  return {
    __esModule: true,
    default: jest.fn(() => "MockedTimeAgo"),
    addDefaultLocale: jest.fn(),
  };
});

describe("Activity component", () => {
  it("renders activity items when activity is available", () => {
    const activity = [
      {
        actDone: "Added",
        detail: "Added item 1",
        doneAt: "2023-08-06T10:00:00Z",
      },
      {
        actDone: "Removed",
        detail: "Removed item 2",
        doneAt: "2023-08-06T11:00:00Z",
      },
    ];

    render(
      <Activity activity={activity} windowSize={600} />
    );

    expect(screen.getByText("Added item 1")).toBeInTheDocument();
    expect(screen.getByText("Removed item 2")).toBeInTheDocument();

    expect(screen.getByText("MockedTimeAgo")).toBeInTheDocument();
  });

  it("renders 'No activity found' message when activity is empty", () => {
    const activity = [];

    render(
      <Activity activity={activity} windowSize={600} />
    );

    expect(screen.getByText("No activity found")).toBeInTheDocument();
  });

  it("renders correct time format based on windowSize prop", () => {
    const activity = [
      {
        actDone: "Modified",
        detail: "Modified item",
        doneAt: "2023-08-06T12:00:00Z",
      },
    ];

    render(
      <Activity activity={activity} windowSize={600} />
    );

    expect(screen.getByText("MockedTimeAgo")).toHaveTextContent("12:00");

    render(
      <Activity activity={activity} windowSize={400} />
    );

    expect(screen.getByText("MockedTimeAgo")).toHaveTextContent("a few seconds ago");
  });
});
