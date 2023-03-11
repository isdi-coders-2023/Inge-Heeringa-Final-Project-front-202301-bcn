import { render, screen } from "@testing-library/angular";
import "@testing-library/jest-dom";

import { LoadingComponent } from "./loading.component";

describe("Given a LoadingComponent", () => {
  describe("When rendered", () => {
    test("Then it should show a loading screen as the main content", async () => {
      await render(LoadingComponent);

      const loadingScreen = screen.getByRole("main");

      expect(loadingScreen).toBeInTheDocument();
    });
  });
});
