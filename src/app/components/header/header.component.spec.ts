import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { provideMockStore } from "@ngrx/store/testing";
import { render, screen } from "@testing-library/angular";
import "@testing-library/jest-dom";
import { selectIsLogged } from "../../store/user/user.reducer";
import { HeaderComponent } from "./header.component";

describe("Given a Header component", () => {
  describe("When rendered", () => {
    test("Then it should show the 'peer2peer' logo", async () => {
      const altText = /peer2peer logo/i;

      await render(HeaderComponent, {
        imports: [HttpClientTestingModule, MatSnackBarModule],
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
