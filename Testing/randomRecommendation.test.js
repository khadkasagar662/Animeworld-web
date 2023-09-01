import React from "react";
import { render, waitFor } from "@testing-library/react";
import { useInView } from "react-intersection-observer";
import { useQuery } from "react-query";
import axios from "axios";
import { RandomRecommendations } from "../Components/Details/RandomRecommendation";

jest.mock("react-query", () => ({
  useQuery: jest.fn(),
}));
jest.mock("react-intersection-observer", () => ({
  useInView: jest.fn(),
}));

describe("RandomRecommendations component", () => {
  it("renders without errors when genres are not provided", () => {
    useInView.mockReturnValue({ ref: null, inView: false });

    const { getByText } = render(<RandomRecommendations genres={[]} />);
    const noItemFoundElement = getByText("No items found.");
    expect(noItemFoundElement).toBeInTheDocument();
  });

  it("renders the expandable container when genres are provided and in view", async () => {
    const genres = [
      { mal_id: 1, name: "Genre 1" },
      { mal_id: 2, name: "Genre 2" },
    ];
    const malId = 12345;
    const data = [
      { mal_id: 101, title: "Anime 1" },
      { mal_id: 102, title: "Anime 2" },
    ];

    useInView.mockReturnValue({ ref: null, inView: true });

    useQuery.mockReturnValue({
      data,
      isLoading: false,
      error: null,
    });

    const { getByText, queryByText } = render(
      <RandomRecommendations genres={genres} malId={malId} />
    );

    expect(queryByText("Anime 1")).toBeNull();
    expect(queryByText("Anime 2")).toBeNull();

    await waitFor(() => {
      expect(getByText("Anime 1")).toBeInTheDocument();
      expect(getByText("Anime 2")).toBeInTheDocument();
    });
  });

  it("renders without errors when the randomGenre is not defined", () => {
    useInView.mockReturnValue({ ref: null, inView: true });

    useQuery.mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    });

    const { getByText } = render(<RandomRecommendations genres={[]} />);
    const noItemFoundElement = getByText("No items found.");
    expect(noItemFoundElement).toBeInTheDocument();
  });
});
