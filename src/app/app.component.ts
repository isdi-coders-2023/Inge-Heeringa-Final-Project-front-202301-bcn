import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { UiService } from "./services/ui/ui.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  isLoading$: Observable<boolean>;

  constructor(private readonly uiService: UiService) {
    this.isLoading$ = this.uiService.getIsLoading();
  }
}
