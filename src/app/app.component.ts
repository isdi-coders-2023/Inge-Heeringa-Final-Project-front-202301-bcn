import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import decode from "jwt-decode";
import { Observable } from "rxjs";
import { UiService } from "./services/ui/ui.service";
import { loginUser } from "./store/user/user.actions";
import { CustomTokenPayload } from "./types";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(
    private readonly uiService: UiService,
    private readonly store: Store
  ) {
    this.isLoading$ = this.uiService.getIsLoading();
  }

  ngOnInit(): void {
    this.checkIsLogged();
  }

  private checkIsLogged() {
    const token = localStorage.getItem("token");

    if (token) {
      const { email } = decode(token) as CustomTokenPayload;

      this.store.dispatch(loginUser({ payload: { email, token } }));
    }
  }
}
