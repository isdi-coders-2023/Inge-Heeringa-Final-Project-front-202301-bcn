import { MatInputModule } from "@angular/material/input";
import { render, screen } from "@testing-library/angular";
import "@testing-library/jest-dom";
import { RegisterFormComponent } from "./register-form.component";

const renderComponent = async () => {
  await render(RegisterFormComponent, {
    imports: [MatInputModule],
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
});
