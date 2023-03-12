import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { render, screen } from "@testing-library/angular";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event/";
import { RegisterFormComponent } from "./register-form.component";

const renderComponent = async () => {
  await render(RegisterFormComponent, {
    imports: [MatInputModule, ReactiveFormsModule],
  });
};

describe("Given a RegisterForm component", () => {
  describe("When rendered", () => {
    test("Then it should show a form", async () => {
      await renderComponent();

      const form = screen.getByRole("form");

      expect(form).toBeInTheDocument();
    });

    test("Then it should show an input field for a username", async () => {
      const labelText = "Username";

      await renderComponent();

      const emailInput = screen.getByLabelText(labelText);

      expect(emailInput).toBeInTheDocument();
    });

    test("Then it should show an input field for an email address", async () => {
      const labelText = "Email";

      await renderComponent();

      const emailInput = screen.getByLabelText(labelText);

      expect(emailInput).toBeInTheDocument();
    });

    test("Then it should show an input field for a password", async () => {
      const labelText = "Password";

      await renderComponent();

      const passwordInput = screen.getByLabelText(labelText);

      expect(passwordInput).toBeInTheDocument();
    });

    test("Then it should show a submit button with the text 'Sign up'", async () => {
      const buttonText = "Sign up";

      await renderComponent();

      const submitButton = screen.getByRole("button", { name: buttonText });

      expect(submitButton).toBeInTheDocument();
    });
  });

  describe("When the user enters a username with a correct format", () => {
    test("Then it should not show any validation errors", async () => {
      await renderComponent();

      const usernameInput = screen.getByLabelText("Username");

      await userEvent.click(usernameInput);
      await userEvent.type(usernameInput, "MockUser");
      await userEvent.tab();

      expect(usernameInput.getAttribute("aria-invalid")).toBe("false");
    });
  });

  describe("When the user's username does not have the correct format", () => {
    test("Then it should show the validation error 'Username can only contain letters, numbers and underscores'", async () => {
      const expectedErrorMessage =
        /username can only contain letters, numbers and underscores/i;

      await renderComponent();

      const usernameInput = screen.getByLabelText("Username");

      await userEvent.click(usernameInput);
      await userEvent.type(usernameInput, "Mock User");
      await userEvent.tab();

      const errorMessage = screen.queryByText(expectedErrorMessage);

      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe("When the user unfocuses the username field leaving it empty", () => {
    test("Then it should show the validation error 'You must enter a username'", async () => {
      const expectedErrorMessage = /you must enter a username/i;

      await renderComponent();

      const usernameInput = screen.getByLabelText("Username");

      await userEvent.click(usernameInput);
      await userEvent.type(usernameInput, "{enter}");
      await userEvent.tab();

      const errorMessage = screen.getByText(expectedErrorMessage);

      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe("When the user enters an email with a correct format", () => {
    test("Then it should not show any validation errors", async () => {
      await renderComponent();

      const emailInput = screen.getByLabelText("Email");

      await userEvent.click(emailInput);
      await userEvent.type(emailInput, "mock@user.com");
      await userEvent.tab();

      expect(emailInput.getAttribute("aria-invalid")).toBe("false");
    });
  });

  describe("When the user's email address does not have the correct format", () => {
    test("Then it should show the validation error 'Not a valid email'", async () => {
      const expectedErrorMessage = /not a valid email/i;

      await renderComponent();

      const emailInput = screen.getByLabelText("Email");

      await userEvent.click(emailInput);
      await userEvent.type(emailInput, "mock@user");
      await userEvent.tab();

      const errorMessage = screen.queryByText(expectedErrorMessage);

      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe("When the user unfocuses the email field leaving it empty", () => {
    test("Then it should show the validation error 'You must enter an email address'", async () => {
      const expectedErrorMessage = /you must enter an email address/i;

      await renderComponent();

      const emailInput = screen.getByLabelText("Email");

      await userEvent.click(emailInput);
      await userEvent.type(emailInput, "{enter}");
      await userEvent.tab();

      const errorMessage = screen.getByText(expectedErrorMessage);

      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe("When the user enters a password between 8 and 20 characters", () => {
    test("Then it should not show any validation errors", async () => {
      await renderComponent();

      const passwordInput = screen.getByLabelText("Password");

      await userEvent.click(passwordInput);
      await userEvent.type(passwordInput, "password123");
      await userEvent.tab();

      expect(passwordInput.getAttribute("aria-invalid")).toBe("false");
    });
  });

  describe("When the entered password is shorter than 8 characters", () => {
    test("Then it should show the validation error 'Password must be at least 8 characters long'", async () => {
      const expectedErrorMessage = /password must have at least 8 characters/i;

      await renderComponent();

      const passwordInput = screen.getByLabelText("Password");

      await userEvent.click(passwordInput);
      await userEvent.type(passwordInput, "1234");
      await userEvent.tab();

      const errorMessage = screen.queryByText(expectedErrorMessage);

      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe("When the entered password is longer than 20 characters", () => {
    test("Then it should show the validation error 'Maximum password length is 20 characters'", async () => {
      const expectedErrorMessage = /maximum password length is 20 characters/i;

      await renderComponent();

      const passwordInput = screen.getByLabelText("Password");

      await userEvent.click(passwordInput);
      await userEvent.type(passwordInput, "thisPasswordIsSuperSafe123");
      await userEvent.tab();

      const errorMessage = screen.queryByText(expectedErrorMessage);

      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe("When the user unfocuses the password field leaving it empty", () => {
    test("Then it should show the validation error 'You must enter a password address'", async () => {
      const expectedErrorMessage = /you must enter a password/i;

      await renderComponent();

      const passwordInput = screen.getByLabelText("Password");

      await userEvent.click(passwordInput);
      await userEvent.type(passwordInput, "{enter}");
      await userEvent.tab();

      const errorMessage = screen.getByText(expectedErrorMessage);

      expect(errorMessage).toBeInTheDocument();
    });
  });
});
