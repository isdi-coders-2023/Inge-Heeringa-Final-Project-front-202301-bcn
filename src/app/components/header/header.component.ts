import { Component, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { type Observable } from "rxjs";
import { UserService } from "../../services/user/user.service";
import { selectIsLogged } from "../../store/user/user.reducer";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  isLogged$: Observable<boolean> = this.store.select(selectIsLogged);
  authUrls = ["/users/login", "/users/register"];

  constructor(
    @Inject(Store) public store: Store,
    @Inject(Router) public router: Router,
    @Inject(UserService) private readonly userService: UserService
  ) {}

  async logoutUser() {
    this.userService.logout();
    await this.router.navigate(["/"]);
  }
}
