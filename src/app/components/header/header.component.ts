import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectIsLogged } from "src/app/store/user/user.reducer";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  isLogged$: Observable<boolean> = this.store.select(selectIsLogged);
  urls = ["/", "/users/login", "/users/register"];

  constructor(public store: Store, public router: Router) {}
}
