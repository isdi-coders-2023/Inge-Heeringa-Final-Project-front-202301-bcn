import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { Store } from "@ngrx/store";
import { render, screen, waitFor } from "@testing-library/angular";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event/";
import { UserService } from "../../services/user/user.service";
import { MockUserService } from "../../spec/user.service.mock";
import { UserRegisterData } from "../../types";
import { createMockStore } from "../../spec/mockStore";
import { RegisterFormComponent } from "./register-form.component";

const renderComponent = async () => {
  const store = createMockStore();
  const userService = new MockUserService();
  await render(RegisterFormComponent, {
    imports: [
      MatInputModule,
      ReactiveFormsModule,
      HttpClientTestingModule,
      MatSnackBarModule,
    ],
    providers: [
      HttpClient,
      { provide: Store, useValue: store },
      { provide: UserService, useValue: userService },
    ],
  });
  return { store, userService };
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

  describe("When the user submits the form with valid register data", () => {
    test("Then the UserService's 'register' method should be invoked", async () => {
      const registerData: UserRegisterData = {
        username: "mockuser",
        email: "mock@user.com",
        password: "safepassword123",
      };

      const { userService } = await renderComponent();
      const spy = jest.spyOn(userService, "register");

      const usernameInput = screen.getByLabelText("username");
      const emailInput = screen.getByLabelText("Email");
      const passwordInput = screen.getByLabelText("Password");
      const submitButton = screen.getByRole("button", { name: "Sign up" });

      await userEvent.type(usernameInput, registerData.username);
      await userEvent.type(emailInput, registerData.email);
      await userEvent.type(passwordInput, registerData.password);
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(spy).toHaveBeenCalledWith(registerData);
      });
    });
  });
});
