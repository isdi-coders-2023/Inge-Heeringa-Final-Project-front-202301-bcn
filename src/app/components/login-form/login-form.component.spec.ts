import { render, screen } from "@testing-library/angular";
import "@testing-library/jest-dom";
import { LoginFormComponent } from "./login-form.component";

describe("Given a LoginForm component", () => {
  describe("When rendered", () => {
    test("Then it should show a form", async () => {
      await render(LoginFormComponent);

      const form = screen.getByRole("form");

      expect(form).toBeInTheDocument();
    });

    test("Then it should show the title 'Log in' in a heading", async () => {
      const title = /log in/i;

      await render(LoginFormComponent);

      const loginTitle = screen.getByRole("heading", { name: title });

      expect(loginTitle).toBeInTheDocument();
    });

    test("Then it should show an input field for an email address", async () => {
      const labelText = /email/i;

      await render(LoginFormComponent);

      const emailInput = screen.getByLabelText(labelText);

      expect(emailInput).toBeInTheDocument();
    });

    test("Then it should show an input field for a password", async () => {
      const labelText = /password/i;

      await render(LoginFormComponent);

      const passwordInput = screen.getByLabelText(labelText);

      expect(passwordInput).toBeInTheDocument();
    });

    test("Then it should show a submit button with the text 'Log in'", async () => {
      const buttonText = "Log in";

      await render(LoginFormComponent);

      const submitButton = screen.getByRole("button", { name: buttonText });

      expect(submitButton).toBeInTheDocument();
    });

    test("Then it should show a redirect link to the register page", async () => {
      const linkText = /not a member yet\? sign up/i;

      await render(LoginFormComponent);

      const redirectLink = screen.getByRole("link", { name: linkText });

      expect(redirectLink).toBeInTheDocument();
    });
  });
});
