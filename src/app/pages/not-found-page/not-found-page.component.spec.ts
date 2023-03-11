import { render, screen } from "@testing-library/angular";
import "@testing-library/jest-dom";
import { NotFoundPageComponent } from "./not-found-page.component";

describe("Given a NotFoundPageComponent", () => {
  describe("When rendered", () => {
    test("Then it should show the text 'Not Found'", async () => {
      const expectedText = /not found/i;

      await render(NotFoundPageComponent);

      const text = screen.getByText(expectedText);

      expect(text).toBeInTheDocument();
    });

    test("Then it should show a redirect button to the home page", async () => {
      const buttonText = /home/i;

      await render(NotFoundPageComponent);

      const redirectButton = screen.getByRole("button", { name: buttonText });

      expect(redirectButton).toBeInTheDocument();
    });
  });
});
