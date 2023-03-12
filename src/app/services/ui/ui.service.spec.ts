import { TestBed } from "@angular/core/testing";
import { Store } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { SnackBarService } from "../snackbar/snackbar.service";
import { UiService } from "./ui.service";
import { hideLoading, showLoading, showModal } from "../../store/ui/ui.actions";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { UiState } from "../../store/ui/types";

let uiService: UiService;
let store: MockStore;
let snackBarService: SnackBarService;
const initialState: UiState = {
  isLoading: false,
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
    const errorMessage = "Login failed";

    test("Then it should dispatch the showModal action with a payload containing a positive isError status and an error message", () => {
      uiService.showErrorModal(errorMessage);

      expect(store.dispatch).toHaveBeenCalledWith(
        showModal({ payload: { isError: true, modalMessage: errorMessage } })
      );
    });

    test("Then it should invoke the openSnackBar method of the SnackBar Service with an error message and a custom class 'error'", () => {
      const customClass = "error";

      uiService.showErrorModal(errorMessage);

      expect(snackBarService.openSnackBar).toHaveBeenCalledWith(
        errorMessage,
        customClass
      );
    });
  });

  describe("When its method showSuccessModal is invoked", () => {
    const successMessage = "Your account has been created";

    test("Then it should dispatch the showModal action with a payload containing a negative isError status and a success message", () => {
      uiService.showSuccessModal(successMessage);

      expect(store.dispatch).toHaveBeenCalledWith(
        showModal({ payload: { isError: false, modalMessage: successMessage } })
      );
    });

    test("Then it should invoke the openSnackBar method of the SnackBar Service with a success message and a custom class 'success'", () => {
      const customClass = "success";

      uiService.showSuccessModal(successMessage);

      expect(snackBarService.openSnackBar).toHaveBeenCalledWith(
        successMessage,
        customClass
      );
    });
  });

  describe("When its method showLoading is invoked", () => {
    test("Then it should dispatch the showLoading action", () => {
      uiService.showLoading();

      expect(store.dispatch).toHaveBeenCalledWith(showLoading());
    });
  });

  describe("When its method hideLoading is invoked", () => {
    test("Then it should dispatch the hideLoading action", () => {
      uiService.hideLoading();

      expect(store.dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });
});
