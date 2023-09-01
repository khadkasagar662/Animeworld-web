import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { MainProfile } from "../Components/Profile/Profile";

jest.mock("react-query", () => ({
  useMutation: jest.fn(),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("MainProfile component", () => {
  it("renders the user's profile information and 'Follow' button for non-current users", () => {
    const user = {
      name: "John Doe",
      image: "profile-img-url",
      bio: "This is a bio.",
      followers: ["follower1", "follower2"],
      following: ["following1", "following2"],
      loggedInUserID: "loggedInUser123",
      isCurrentUsersProfile: false,
      pinnedItemsDetails: [
        { mal_id: 1, image_url: "image1-url", title: "Anime 1" },
        { mal_id: 2, image_url: "image2-url", title: "Anime 2" },
      ],
      isError: false,
      isLoading: false,
    };

    const mockPush = jest.fn();
    useRouter.mockReturnValue({ push: mockPush });

    render(<MainProfile {...user} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("This is a bio.")).toBeInTheDocument();
    expect(screen.getByText("2 Followers")).toBeInTheDocument();
    expect(screen.getByText("2 Following")).toBeInTheDocument();

    const followButton = screen.getByText("Follow");
    expect(followButton).toBeInTheDocument();

    fireEvent.click(followButton);
    expect(mockPush).toHaveBeenCalledWith("/userauth"); 
  });

  it("renders the user's profile information and 'Following' button for current users", () => {
    const user = {
      name: "John Doe",
      image: "profile-img-url",
      bio: "This is a bio.",
      followers: ["follower1", "follower2"],
      following: ["following1", "following2"],
      loggedInUserID: "loggedInUser123",
      isCurrentUsersProfile: true,
      pinnedItemsDetails: [
        { mal_id: 1, image_url: "image1-url", title: "Anime 1" },
        { mal_id: 2, image_url: "image2-url", title: "Anime 2" },
      ],
      isError: false,
      isLoading: false,
    };

    const mockPush = jest.fn();
    useRouter.mockReturnValue({ push: mockPush });

    render(<MainProfile {...user} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("This is a bio.")).toBeInTheDocument();
    expect(screen.getByText("2 Followers")).toBeInTheDocument();
    expect(screen.getByText("2 Following")).toBeInTheDocument();

    const followingButton = screen.getByText("Following");
    expect(followingButton).toBeInTheDocument();

    fireEvent.click(followingButton);
    expect(mockPush).not.toHaveBeenCalled(); 
  });

});
