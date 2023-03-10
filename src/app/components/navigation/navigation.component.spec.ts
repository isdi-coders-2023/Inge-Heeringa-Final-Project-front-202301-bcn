import { NavigationComponent } from "./navigation.component";
import { render, screen } from "@testing-library/angular";
import "@testing-library/jest-dom";

describe("Given a Navigation component", () => {
  describe("When rendered", () => {
    test("Then it should show a link to 'Home'", async () => {
      await render(NavigationComponent);

      const link = screen.getByRole("link", { name: /home/i });

      expect(link).toBeInTheDocument();
    });
  });
});
