import { Component, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { type Observable } from "rxjs";
import { selectIsLogged } from "../../store/user/user.reducer";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  isLogged$: Observable<boolean> = this.store.select(selectIsLogged);
  urls = ["/", "/users/login", "/users/register"];

  constructor(
    @Inject(Store) public store: Store,
    @Inject(Router) public router: Router
  ) {}
}
