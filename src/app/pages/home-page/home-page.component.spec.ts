import { render, screen } from "@testing-library/angular";
import "@testing-library/jest-dom";
import { HomePageComponent } from "./home-page.component";

describe("Given a HomePageComponent", () => {
  describe("When rendered", () => {
    test("Then it should show the 'peer2peer' logo", async () => {
      const altText = /peer2peer logo/i;

      await render(HomePageComponent);

      const logo = screen.getByRole("img", { name: altText });

      expect(logo).toBeInTheDocument();
    });

    test("Then it should show a call to action to sign up", async () => {
      const ctaText = /sign up/i;

      await render(HomePageComponent);

      const logo = screen.getByRole("link", { name: ctaText });

      expect(logo).toBeInTheDocument();
    });

    test("Then it should show a call to action to log in", async () => {
      const ctaText = /log in/i;

      await render(HomePageComponent);

      const logo = screen.getByRole("link", { name: ctaText });

      expect(logo).toBeInTheDocument();
    });
  });
});
