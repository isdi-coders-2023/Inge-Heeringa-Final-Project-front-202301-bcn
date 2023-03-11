import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { UserService } from "src/app/services/user/user.service";
import { selectIsLogged } from "src/app/store/user/user.reducer";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent {
  isLogged$: Observable<boolean> = this.store.select(selectIsLogged);

  constructor(
    private readonly store: Store,
    private readonly userService: UserService
  ) {}

  logoutUser() {
    this.userService.logout();
  }
}
