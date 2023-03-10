import { Inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { type Observable } from "rxjs";
import { selectIsLoading } from "../../store/ui/ui.reducer";
import { hideLoading, showLoading, showModal } from "../../store/ui/ui.actions";
import { SnackBarService } from "../snackbar/snackbar.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class UiService {
  constructor(
    @Inject(Store) private readonly store: Store,
    @Inject(SnackBarService)
    private readonly snackbarService: SnackBarService,
    @Inject(Router) public router: Router
  ) {}

  showErrorModal(errorMessage: string) {
    this.store.dispatch(
      showModal({
        payload: { isError: true, modalMessage: errorMessage },
      })
    );
    this.snackbarService.openSnackBar(errorMessage, "error");
  }

  showSuccessModal(errorMessage: string) {
    this.store.dispatch(
      showModal({
        payload: { isError: false, modalMessage: errorMessage },
      })
    );
    this.snackbarService.openSnackBar(errorMessage, "success");
  }

  showLoading() {
    this.store.dispatch(showLoading());
  }

  getIsLoading(): Observable<boolean> {
    return this.store.select(selectIsLoading);
  }

  hideLoading() {
    this.store.dispatch(hideLoading());
  }

  redirectUser(route: string) {
    (async () => this.router.navigate([route]))();
  }
}
