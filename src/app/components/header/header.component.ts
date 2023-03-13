import { Component, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { type Observable } from "rxjs";
import { UserService } from "../../services/user/user.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  isLogged$: Observable<boolean> = this.userService.getIsLogged();
  authUrls = ["/users/login", "/users/register"];

  constructor(
    @Inject(Router) public router: Router,
    @Inject(UserService) private readonly userService: UserService
  ) {}

  async logoutUser() {
    this.userService.logout();
    (async () => this.router.navigate([""]))();
  }
}
