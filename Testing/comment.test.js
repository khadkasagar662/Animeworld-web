import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { useQuery, useMutation } from "react-query";
import { useInView } from "react-intersection-observer";
import { CommentsBox } from "../Components/Details/CommentsBox";

jest.mock("react-query", () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
}));

jest.mock("react-intersection-observer", () => ({
  useInView: jest.fn(),
}));

jest.mock("axios"); // Mock axios

describe("CommentsBox component", () => {
  it("renders the comment box for a logged-in user", () => {
    const user = { _id: "user123" };
    const malid = "12345";

    useQuery.mockReturnValue({
      data: { data: { comments: [], mainCommentCount: 0, subCommentsCount: 0 } },
      isLoading: false,
    });

    const { getByLabelText, queryByText } = render(
      <CommentsBox user={user} malid={malid} />
    );

    const commentInput = getByLabelText("Comment box");
    expect(commentInput).toBeInTheDocument();

    const cancelBtn = queryByText("Cancel");
    expect(cancelBtn).toBeNull(); 
  });

  it("renders the 'Please sign in to comment.' message for a non-logged-in user", () => {
    const user = null;
    const malid = "12345";

    useQuery.mockReturnValue({
      data: { data: { comments: [], mainCommentCount: 0, subCommentsCount: 0 } },
      isLoading: false,
    });

    const { getByText } = render(<CommentsBox user={user} malid={malid} />);

    const signInMessage = getByText("Please sign in to comment.");
    expect(signInMessage).toBeInTheDocument();
  });

  it("renders the comments and handles like/dislike buttons for logged-in user", async () => {
    const user = { _id: "user123" };
    const malid = "12345";

    const commentsData = {
      comments: [
        {
          _id: "comment1",
          body: "This is comment 1.",
          date: "2023-08-06T12:34:56Z",
          dislikeCount: 5,
          likeCount: 10,
          userID: "user456",
          userName: "User456",
          userProfileImg: "profile-img-url",
        },
      ],
      mainCommentCount: 1,
      subCommentsCount: 0,
    };

    useQuery.mockReturnValue({
      data: { data: commentsData },
      isLoading: false,
    });

    const { getByText, getByLabelText } = render(
      <CommentsBox user={user} malid={malid} />
    );

    const comment1 = getByText("This is comment 1.");
    expect(comment1).toBeInTheDocument();

    const likeButton = getByLabelText("Like");
    const dislikeButton = getByLabelText("Dislike");
    expect(likeButton).toBeInTheDocument();
    expect(dislikeButton).toBeInTheDocument();

    fireEvent.click(likeButton);
    fireEvent.click(dislikeButton);

    await waitFor(() => {
      const likeCount = getByText("10");
      const dislikeCount = getByText("5");
      expect(likeCount).toBeInTheDocument();
      expect(dislikeCount).toBeInTheDocument();
    });
  });

});
