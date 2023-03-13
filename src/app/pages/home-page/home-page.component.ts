import { Component, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { type Observable } from "rxjs";
import { UserService } from "../../services/user/user.service";
import { selectIsLogged } from "../../store/user/user.reducer";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent {
  isLogged$: Observable<boolean> = this.store.select(selectIsLogged);

  constructor(
    @Inject(Store) public store: Store,
    @Inject(UserService) private readonly userService: UserService,
    @Inject(Router) private readonly router: Router
  ) {}

  async logoutUser() {
    this.userService.logout();
    await this.router.navigate([""]);
  }
}
