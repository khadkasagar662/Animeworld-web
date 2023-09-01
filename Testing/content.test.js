import React from "react";
import { render } from "@testing-library/react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import AnimeContent from "../pages/anime/content";

jest.mock("axios", () => ({
  get: jest.fn(),
}));

jest.mock("react-intersection-observer", () => ({
  useInView: jest.fn(),
}));

jest.mock("react-query", () => ({
  useInfiniteQuery: jest.fn(),
}));

describe("AnimeContent component", () => {
  it("renders the AnimeGenre component with correct props", () => {
    const genreId = "21"; 
    const headerContent = "Action"; 
    const sort = "asc"; 
    const orderBy = "name"; 

    useInView.mockReturnValue({ ref: {}, inView: true });

    useInfiniteQuery.mockReturnValue({
      data: {
        pages: [
          {
            data: [
              { mal_id: 1, title: "Anime 1" },
              { mal_id: 2, title: "Anime 2" },
            ],
          },
          {
            data: [
              { mal_id: 3, title: "Anime 3" },
              { mal_id: 4, title: "Anime 4" },
            ],
          },
        ],
      },
      isLoading: false,
      isError: false,
      error: null,
      hasNextPage: true,
      isFetchingNextPage: false,
      fetchNextPage: jest.fn(),
    });

    const { getByText } = render(
      <AnimeContent
        rawGenre={headerContent.toLowerCase().replace(" ", "_")}
        initialData={{
          data: [
            { mal_id: 1, title: "Anime 1" },
            { mal_id: 2, title: "Anime 2" },
          ],
        }}
        headerContent={headerContent}
        genreId={genreId}
        sort={sort}
        orderBy={orderBy}
      />
    );

    expect(getByText("Action Anime")).toBeInTheDocument();
    expect(getByText("Anime 1")).toBeInTheDocument();
    expect(getByText("Anime 2")).toBeInTheDocument();
    expect(getByText("Anime 3")).toBeInTheDocument();
    expect(getByText("Anime 4")).toBeInTheDocument();
  });

});
