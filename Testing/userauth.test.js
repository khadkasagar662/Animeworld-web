import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { useMutation } from "react-query";
import UserAuthentication from "../pages/userauth";

jest.mock("react-query", () => ({
  useMutation: jest.fn(),
}));

jest.mock("next/router", () => ({
  useRouter: () => ({ replace: jest.fn() }),
}));

describe("UserAuthentication component", () => {
  it("renders the sign-in form by default", () => {
    useMutation.mockReturnValue({
      mutate: jest.fn(),
      data: null,
      isLoading: false,
      error: null,
      isError: false,
      isSuccess: false,
      reset: jest.fn(),
    });

    const { getByText, getByPlaceholderText } = render(<UserAuthentication />);

    expect(getByText("Welcome back :)")).toBeInTheDocument();
    expect(getByPlaceholderText("Email")).toBeInTheDocument();
    expect(getByPlaceholderText("Password")).toBeInTheDocument();
    expect(getByText("Sign in")).toBeInTheDocument();
    expect(getByText("New user? Create new account")).toBeInTheDocument();
  });

  it("switches to the sign-up form when 'Create new account' button is clicked", () => {
    useMutation.mockReturnValue({
      mutate: jest.fn(),
      data: null,
      isLoading: false,
      error: null,
      isError: false,
      isSuccess: false,
      reset: jest.fn(),
    });

    const { getByText, getByPlaceholderText } = render(<UserAuthentication />);

    const createNewAccountBtn = getByText("Create new account");
    fireEvent.click(createNewAccountBtn);

    expect(getByText("Create account")).toBeInTheDocument();
    expect(getByPlaceholderText("Username")).toBeInTheDocument();
    expect(getByPlaceholderText("Email")).toBeInTheDocument();
    expect(getByPlaceholderText("Password")).toBeInTheDocument();
    expect(getByText("Sign up")).toBeInTheDocument();
    expect(getByText("Already a user? Log in here")).toBeInTheDocument();
  });

  it("renders error message on invalid form submission", async () => {
    useMutation.mockReturnValue({
      mutate: jest.fn(() => Promise.reject(new Error("Mock error"))),
      data: null,
      isLoading: false,
      error: { response: { data: { name: "ValidationErrorname", message: "Invalid name" } } },
      isError: true,
      isSuccess: false,
      reset: jest.fn(),
    });

    const { getByText, getByPlaceholderText } = render(<UserAuthentication />);

    const createNewAccountBtn = getByText("Create new account");
    fireEvent.click(createNewAccountBtn);

    const usernameInput = getByPlaceholderText("Username");
    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");
    const signUpBtn = getByText("Sign up");

    fireEvent.change(usernameInput, { target: { value: "" } });
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.change(passwordInput, { target: { value: "pass" } });

    fireEvent.click(signUpBtn);

    await waitFor(() => {
      expect(getByText("Invalid name")).toBeInTheDocument();
    });
  });

});
