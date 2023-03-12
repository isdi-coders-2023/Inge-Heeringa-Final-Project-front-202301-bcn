import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { provideMockStore } from "@ngrx/store/testing";
import { render, screen, waitFor } from "@testing-library/angular";
import "@testing-library/jest-dom";
import { NotFoundPageComponent } from "../../pages/not-found-page/not-found-page.component";
import { selectIsLogged } from "../../store/user/user.reducer";
import { HeaderComponent } from "./header.component";

describe("Given a Header component", () => {
  describe("When rendered", () => {
    test("Then it should show the 'peer2peer' logo", async () => {
      const altText = /peer2peer logo/i;

      await render(HeaderComponent, {
        providers: [
          provideMockStore({
            selectors: [{ selector: selectIsLogged, value: false }],
          }),
        ],
      });

      const logo = screen.getByRole("img", { name: altText });

      expect(logo).toBeInTheDocument();
    });
  });
});
