import { Inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { showModal } from "../../store/ui/actions/ui.actions";
import { SnackBarService } from "../snackbar/snackbar.service";

@Injectable({
  providedIn: "root",
})
export class UiService {
  constructor(
    private readonly store: Store,
    @Inject(SnackBarService)
    private readonly snackbarService: SnackBarService
  ) {}

  showErrorModal(errorMessage: string) {
    this.store.dispatch(
      showModal({
        payload: { isError: true, modalMessage: errorMessage },
      })
    );
    this.snackbarService.openSnackBar(errorMessage);
  }
}
