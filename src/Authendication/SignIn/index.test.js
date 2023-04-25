import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import SignIn from "./SignIn";

describe("SignIn component", () => {
  test("Renders sign-in form with email and password inputs and submit button", () => {
    render(<SignIn />);
    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(screen.getByLabelText("Email:")).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign In" })).toBeInTheDocument();
  });

  test("Shows error message when email or password is empty on form submit", async () => {
    render(<SignIn />);
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));
    await waitFor(() =>
      expect(screen.getByText("Please enter the email address.")).toBeInTheDocument()
    );
  });

  test("Shows error message for invalid credentials", async () => {
    const axios = require("axios");
    jest.mock("axios");
    axios.post.mockRejectedValue({ response: { data: { error: "invalid credentials" } } });
    render(<SignIn />);
    fireEvent.change(screen.getByLabelText("Email:"), { target: { value: "test@test.com" } });
    fireEvent.change(screen.getByLabelText("Password:"), { target: { value: "test123" } });
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));
    await waitFor(() =>
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument()
    );
  });

  test("Navigates to home page on successful login", async () => {
    const axios = require("axios");
    jest.mock("axios");
    axios.post.mockResolvedValue({ data: { token: "testtoken" } });
    const navigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => navigate,
    }));
    render(<SignIn />);
    fireEvent.change(screen.getByLabelText("Email:"), { target: { value: "test@test.com" } });
    fireEvent.change(screen.getByLabelText("Password:"), { target: { value: "test123" } });
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));
    await waitFor(() => expect(navigate).toHaveBeenCalledWith("/"));
  });
});
