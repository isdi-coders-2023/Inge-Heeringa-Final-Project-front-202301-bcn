import { Inject, Injectable } from "@angular/core";
import {
  MatSnackBar,
  type MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class SnackBarService {
  verticalPosition: MatSnackBarVerticalPosition = "top";

  constructor(@Inject(MatSnackBar) private readonly snackBar: MatSnackBar) {}

  openSnackBar(message: string, customClass: string) {
    this.snackBar.open(message, "Close", {
      verticalPosition: this.verticalPosition,
      panelClass: customClass,
    });
  }
}
