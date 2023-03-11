import { Injectable } from "@angular/core";
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class SnackBarService {
  verticalPosition: MatSnackBarVerticalPosition = "top";

  constructor(private readonly snackBar: MatSnackBar) {}

  openSnackBar(message: string, customClass: string) {
    this.snackBar.open(message, "Close", {
      verticalPosition: this.verticalPosition,
      panelClass: customClass,
    });
  }
}
