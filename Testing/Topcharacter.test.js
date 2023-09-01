import React from "react";
import { render } from "@testing-library/react";
import { useQueries } from "react-query";
import TopCharcter from "../pages/topcharacters";

jest.mock("react-query", () => ({
  useQueries: jest.fn(),
}));

describe("TopCharcter component", () => {
  it("renders the component with correct data", () => {
    const topCharcters = [
      { mal_id: 1, name: "naruto" },
      { mal_id: 2, name: "luffy" },
    ];

    useQueries.mockReturnValue([
      {
        data: { data: { popularCharacters: topCharcters } },
        isLoading: false,
        isError: false,
      },
      {
        data: { data: { popularCharacters: topCharcters } },
        isLoading: false,
        isError: false,
      },
    ]);

    const { getByText } = render(<TopCharcter topCharcters={topCharcters} />);

    expect(getByText("Top Characters")).toBeInTheDocument();
    expect(getByText("naruto")).toBeInTheDocument();
    expect(getByText("luffy")).toBeInTheDocument();
  });

});
