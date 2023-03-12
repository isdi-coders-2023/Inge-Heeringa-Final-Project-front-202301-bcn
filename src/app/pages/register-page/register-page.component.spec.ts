import { render, screen } from "@testing-library/angular";
import "@testing-library/jest-dom";
import { RegisterPageComponent } from "./register-page.component";

describe("Given a RegisterPageComponent", () => {
  describe("When rendered", () => {
    test("Then it should show the title 'Sign up' in a heading", async () => {
      const title = /sign up/i;

      await render(RegisterPageComponent);

      const registerTitle = screen.getByRole("heading", { name: title });

      expect(registerTitle).toBeInTheDocument();
    });

    test("Then it should show a redirect link to the login page", async () => {
      const linkText = /already a member\? log in/i;

      await render(RegisterPageComponent);

      const redirectLink = screen.getByRole("link", { name: linkText });

      expect(redirectLink).toBeInTheDocument();
    });
  });
});
