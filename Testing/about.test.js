import React from "react";
import { render, screen } from "@testing-library/react";
import About from "../pages/about";

describe("About component", () => {
  it("renders the about page content", () => {
    render(<About />);

    expect(
      screen.getByText(
        "Animeworld is a place for Anime Lovers. It's a place where you can view any Upcoming anime or some of the Top ones. Want to checkout any of your favourite anime ? don't worry we have Live Search through which you can check details of any of your favourite anime. Want to checkout out about your favourite Character? the character section got information about Top characters and much more...."
      )
    ).toBeInTheDocument();

    const jikanLink = screen.getByText("More details");
    expect(jikanLink).toBeInTheDocument();
    expect(jikanLink.href).toBe("https://github.com/jikan-me/jikan");

    expect(screen.getByText("Connect with me")).toBeInTheDocument();

    const githubLink = screen.getByTestId("github-link");
    const twitterLink = screen.getByTestId("twitter-link");

    expect(githubLink.href).toBe("https://github.com");
    expect(twitterLink.href).toBe("https://twitter.com");
  });
});
