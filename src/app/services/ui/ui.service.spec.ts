import { TestBed } from "@angular/core/testing";
import { Store } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { SnackBarService } from "../snackbar/snackbar.service";
import { UiService } from "./ui.service";
import { showModal } from "../../store/ui/ui.actions";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { UiState } from "../../store/ui/types";

let uiService: UiService;
let store: MockStore;
let snackBarService: SnackBarService;
const initialState: UiState = {
  modalMessage: "",
  isError: false,
};

describe("Given a Ui Service", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, BrowserAnimationsModule],
      providers: [
        UiService,
        SnackBarService,
        provideMockStore({ initialState }),
      ],
    });
    uiService = TestBed.inject(UiService);
    store = TestBed.inject(Store) as MockStore;
    snackBarService = TestBed.inject(SnackBarService);

    jest.spyOn(store, "dispatch");
    jest.spyOn(snackBarService, "openSnackBar");
  });

  describe("When its method showErrorModal is invoked", () => {
    test("Then it should dispatch the showModal action with a payload containing a positive isError status and an error message", () => {
      const errorMessage = "Login failed";

      uiService.showErrorModal(errorMessage);

      expect(store.dispatch).toHaveBeenCalledWith(
        showModal({ payload: { isError: true, modalMessage: errorMessage } })
      );
    });

    test("Then it should invoke the openSnackBar method of the SnackBar Service with an error message and a custom class 'error'", () => {
      const errorMessage = "Login failed";
      const customClass = "error";

      uiService.showErrorModal(errorMessage);

      expect(snackBarService.openSnackBar).toHaveBeenCalledWith(
        errorMessage,
        customClass
      );
    });
  });
});
