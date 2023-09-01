import React from "react";
import { render } from "@testing-library/react";
import { AnimeGenre } from "../Components/AnimeContent/AnimeGenre";

jest.mock("Components/Global/Card/Card", () => ({ Card: jest.fn() }));
jest.mock("Components/Global/CircularSpinner", () => ({
  CircularSpinner: jest.fn(),
}));
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  forwardRef: (component) => component,
}));

describe("AnimeGenre component", () => {
  it("renders the header and cards correctly", () => {
    const headerContent = "Action";
    const data = [
      {
        data: [
          {
            mal_id: 1,
            images: {
              jpg: { image_url: "image_url_1" },
            },
            title_english: "Anime 1",
            title: "Anime 1",
            type: "TV",
            name: "Character 1",
          },
          {
            mal_id: 2,
            images: {
              jpg: { image_url: "image_url_2" },
            },
            title_english: "Anime 2",
            title: "Anime 2",
            type: "Movie",
            name: "Character 2",
          },
        ],
      },
    ];
    const hasNextPage = true;
    const isCharacters = false;

    const { getByText, getByAltText } = render(
      <AnimeGenre
        headerContent={headerContent}
        data={data}
        hasNextPage={hasNextPage}
        isCharacters={isCharacters}
      />
    );

    expect(getByText("Action anime")).toBeInTheDocument();

    const anime1Image = getByAltText("Anime 1");
    expect(anime1Image).toHaveAttribute("src", "image_url_1");

    const anime2Image = getByAltText("Anime 2");
    expect(anime2Image).toHaveAttribute("src", "image_url_2");
  });

  it("renders the loading text when there is no next page", () => {
    const headerContent = "Action";
    const data = [
      {
        data: [
          {
            mal_id: 1,
            images: {
              jpg: { image_url: "image_url_1" },
            },
            title_english: "Anime 1",
            title: "Anime 1",
            type: "TV",
            name: "Character 1",
          },
        ],
      },
    ];
    const hasNextPage = false;
    const isCharacters = false;

    const { getByText } = render(
      <AnimeGenre
        headerContent={headerContent}
        data={data}
        hasNextPage={hasNextPage}
        isCharacters={isCharacters}
      />
    );

    expect(getByText("Looks like that's it")).toBeInTheDocument();
  });
});
