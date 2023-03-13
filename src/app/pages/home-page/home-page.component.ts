import { Component, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { type Observable } from "rxjs";
import { UiService } from "../../services/ui/ui.service";
import { UserService } from "../../services/user/user.service";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent {
  isLogged$: Observable<boolean> = this.userService.getIsLogged();

  constructor(
    @Inject(UserService) private readonly userService: UserService,
    @Inject(Router) private readonly router: Router,
    @Inject(UiService) private readonly uiService: UiService
  ) {}

  async logoutUser() {
    this.userService.logout();
    this.uiService.redirectUser("");
  }
}
