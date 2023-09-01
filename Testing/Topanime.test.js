import React from "react";
import { render, screen } from "@testing-library/react";
import { useQuery } from "react-query";
import TopAnime from "../pages/topanime";

jest.mock("react-query", () => ({
  useQuery: jest.fn(),
}));

describe("TopAnime component", () => {
  it("renders the top anime sections with data", async () => {
    useQuery
      .mockReturnValueOnce({
        data: [
          { id: 1, title: "Upcoming Anime 1" },
          { id: 2, title: "Upcoming Anime 2" },
        ],
        isLoading: false,
        isError: false,
        error: null,
      })
      .mockReturnValueOnce({
        data: [
          { id: 3, title: "Popular Anime 1" },
          { id: 4, title: "Popular Anime 2" },
        ],
        isLoading: false,
        isError: false,
        error: null,
      })
      .mockReturnValueOnce({
        data: [
          { id: 5, title: "Currently Airing Anime 1" },
          { id: 6, title: "Currently Airing Anime 2" },
        ],
        isLoading: false,
        isError: false,
        error: null,
      });

    const genres = ["Action", "Adventure", "Comedy", "Isekai","Horror","Si-fi"];

    render(<TopAnime genres={genres} />);

    expect(screen.getByText("Top Airing")).toBeInTheDocument();
    expect(screen.getByText("Latest toppers")).toBeInTheDocument();
    expect(screen.getByText("Top Upcoming")).toBeInTheDocument();
    expect(screen.getByText("Something to look forward too")).toBeInTheDocument();
    expect(screen.getByText("Most Popular")).toBeInTheDocument();
    expect(screen.getByText("All time favorites")).toBeInTheDocument();

    expect(screen.getByText("Upcoming Anime 1")).toBeInTheDocument();
    expect(screen.getByText("Upcoming Anime 2")).toBeInTheDocument();

    expect(screen.getByText("Popular Anime 1")).toBeInTheDocument();
    expect(screen.getByText("Popular Anime 2")).toBeInTheDocument();

    expect(screen.getByText("Currently Airing Anime 1")).toBeInTheDocument();
    expect(screen.getByText("Currently Airing Anime 2")).toBeInTheDocument();

    expect(screen.getByText("Genres")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByText("Adventure")).toBeInTheDocument();
    expect(screen.getByText("Comedy")).toBeInTheDocument();

    expect(screen.getByText("From your inventory")).toBeInTheDocument();
  });

  it("renders loading state while data is being fetched", async () => {
    useQuery
      .mockReturnValueOnce({
        isLoading: true,
        isError: false,
        error: null,
      })
      .mockReturnValueOnce({
        isLoading: true,
        isError: false,
        error: null,
      })
      .mockReturnValueOnce({
        isLoading: true,
        isError: false,
        error: null,
      });

    const genres = ["Action", "Adventure", "Comedy", /* Add more genres */];

    render(<TopAnime genres={genres} />);

    expect(screen.getByTestId("loading-spinner-upcoming")).toBeInTheDocument();
    expect(screen.getByTestId("loading-spinner-popular")).toBeInTheDocument();
    expect(screen.getByTestId("loading-spinner-airing")).toBeInTheDocument();
  });

  it("renders error state if there is an error fetching data", async () => {
    useQuery
      .mockReturnValueOnce({
        data: null,
        isLoading: false,
        isError: true,
        error: new Error("Error fetching upcoming anime"),
      })
      .mockReturnValueOnce({
        data: null,
        isLoading: false,
        isError: true,
        error: new Error("Error fetching popular anime"),
      })
      .mockReturnValueOnce({
        data: null,
        isLoading: false,
        isError: true,
        error: new Error("Error fetching currently airing anime"),
      });

    const genres = ["Action", "Adventure", "Comedy"];

    render(<TopAnime genres={genres} />);

    expect(screen.getByText("Error fetching upcoming anime")).toBeInTheDocument();
    expect(screen.getByText("Error fetching popular anime")).toBeInTheDocument();
    expect(
      screen.getByText("Error fetching currently airing anime")
    ).toBeInTheDocument();
  });
});
