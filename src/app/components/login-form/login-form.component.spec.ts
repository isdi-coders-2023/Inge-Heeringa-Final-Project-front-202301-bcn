import { render, screen } from "@testing-library/angular";
import userEvent from "@testing-library/user-event";
import { MatInputModule } from "@angular/material/input";
import "@testing-library/jest-dom";
import { LoginFormComponent } from "./login-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { provideMockStore } from "@ngrx/store/testing";

describe("Given a LoginForm component", () => {
  describe("When rendered", () => {
    test("Then it should show a form", async () => {
      await render(LoginFormComponent, {
        imports: [MatInputModule, ReactiveFormsModule, HttpClientTestingModule],
        providers: [UserService, HttpClient, provideMockStore()],
      });

      const form = screen.getByRole("form");

      expect(form).toBeInTheDocument();
    });

    test("Then it should show the title 'Log in' in a heading", async () => {
      const title = /log in/i;

      await render(LoginFormComponent, {
        imports: [MatInputModule, ReactiveFormsModule, HttpClientTestingModule],
        providers: [UserService, HttpClient, provideMockStore()],
      });

      const loginTitle = screen.getByRole("heading", { name: title });

      expect(loginTitle).toBeInTheDocument();
    });

    test("Then it should show an input field for an email address", async () => {
      const labelText = "Email";

      await render(LoginFormComponent, {
        imports: [MatInputModule, ReactiveFormsModule, HttpClientTestingModule],
        providers: [UserService, HttpClient, provideMockStore()],
      });

      const emailInput = screen.getByLabelText(labelText);

      expect(emailInput).toBeInTheDocument();
    });

    test("Then it should show an input field for a password", async () => {
      const labelText = "Password";

      await render(LoginFormComponent, {
        imports: [MatInputModule, ReactiveFormsModule, HttpClientTestingModule],
        providers: [UserService, HttpClient, provideMockStore()],
      });

      const passwordInput = screen.getByLabelText(labelText);

      expect(passwordInput).toBeInTheDocument();
    });

    test("Then it should show a submit button with the text 'Log in'", async () => {
      const buttonText = "Log in";

      await render(LoginFormComponent, {
        imports: [MatInputModule, ReactiveFormsModule, HttpClientTestingModule],
        providers: [UserService, HttpClient, provideMockStore()],
      });

      const submitButton = screen.getByRole("button", { name: buttonText });

      expect(submitButton).toBeInTheDocument();
    });

    test("Then it should show a redirect link to the register page", async () => {
      const linkText = /not a member yet\? sign up/i;

      await render(LoginFormComponent, {
        imports: [MatInputModule, ReactiveFormsModule, HttpClientTestingModule],
        providers: [UserService, HttpClient, provideMockStore()],
      });

      const redirectLink = screen.getByRole("link", { name: linkText });

      expect(redirectLink).toBeInTheDocument();
    });
  });

  describe("When the user enters an email with a correct format", () => {
    test("Then it should not show any validation errors", async () => {
      await render(LoginFormComponent, {
        imports: [MatInputModule, ReactiveFormsModule, HttpClientTestingModule],
        providers: [UserService, HttpClient, provideMockStore()],
      });

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

      await render(LoginFormComponent, {
        imports: [MatInputModule, ReactiveFormsModule, HttpClientTestingModule],
        providers: [UserService, HttpClient, provideMockStore()],
      });

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

      await render(LoginFormComponent, {
        imports: [MatInputModule, ReactiveFormsModule, HttpClientTestingModule],
        providers: [UserService, HttpClient, provideMockStore()],
      });

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
      await render(LoginFormComponent, {
        imports: [MatInputModule, ReactiveFormsModule, HttpClientTestingModule],
        providers: [UserService, HttpClient, provideMockStore()],
      });

      const passwordInput = screen.getByLabelText("Password");

      await userEvent.click(passwordInput);
      await userEvent.type(passwordInput, "password123");
      await userEvent.tab();

      expect(passwordInput.getAttribute("aria-invalid")).toBe("false");
    });
  });

  describe("When the entered password is shorter than 8 characters", () => {
    test("Then it should show the validation error 'Password must be at least 8 characters long'", async () => {
      const expectedErrorMessage =
        /password must be at least 8 characters long/i;

      await render(LoginFormComponent, {
        imports: [MatInputModule, ReactiveFormsModule, HttpClientTestingModule],
        providers: [UserService, HttpClient, provideMockStore()],
      });

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

      await render(LoginFormComponent, {
        imports: [MatInputModule, ReactiveFormsModule, HttpClientTestingModule],
        providers: [UserService, HttpClient, provideMockStore()],
      });

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

      await render(LoginFormComponent, {
        imports: [MatInputModule, ReactiveFormsModule, HttpClientTestingModule],
        providers: [UserService, HttpClient, provideMockStore()],
      });

      const passwordInput = screen.getByLabelText("Password");

      await userEvent.click(passwordInput);
      await userEvent.type(passwordInput, "{enter}");
      await userEvent.tab();

      const errorMessage = screen.getByText(expectedErrorMessage);

      expect(errorMessage).toBeInTheDocument();
    });
  });
});
