import { Component, Inject, type OnInit } from "@angular/core";
import decode from "jwt-decode";
import { type Observable } from "rxjs";
import { UiService } from "./services/ui/ui.service";
import { UserService } from "./services/user/user.service";
import { type CustomTokenPayload } from "./types";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(
    @Inject(UiService) private readonly uiService: UiService,
    @Inject(UserService) private readonly userService: UserService
  ) {
    this.isLoading$ = this.uiService.getIsLoading();
  }

  ngOnInit(): void {
    this.checkIsLogged();
  }

  private checkIsLogged() {
    const token = localStorage.getItem("token");

    if (token) {
      const { email }: CustomTokenPayload = decode(token);

      this.userService.login({ email, token });
    }
  }
}
