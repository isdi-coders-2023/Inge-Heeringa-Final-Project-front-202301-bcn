import { render, screen } from "@testing-library/angular";
import "@testing-library/jest-dom";
import { LoginPageComponent } from "./login-page.component";

describe("Given a LoginPageComponent", () => {
  describe("When rendered", () => {
    test("Then it should show the title 'Log in' in a heading", async () => {
      const title = /log in/i;

      await render(LoginPageComponent);

      const loginTitle = screen.getByRole("heading", { name: title });

      expect(loginTitle).toBeInTheDocument();
    });

    test("Then it should show a redirect link to the register page", async () => {
      const linkText = /not a member yet\? sign up/i;

      await render(LoginPageComponent);

      const redirectLink = screen.getByRole("link", { name: linkText });

      expect(redirectLink).toBeInTheDocument();
    });
  });
});
