import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { catchError, throwError, type Observable } from "rxjs";
import { User, UserCredentials } from "../../store/user/types";
import { UiService } from "../ui/ui.service";
import { logoutUser } from "../../store/user/user.actions";
import { Store } from "@ngrx/store";

@Injectable({
  providedIn: "root",
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  private readonly userUrl = `${environment.apiUrl}${environment.paths.users}${environment.paths.login}`;

  constructor(
    private readonly http: HttpClient,
    private readonly uiService: UiService,
    private readonly store: Store
  ) {}

  public get userEndpoint(): string {
    return this.userUrl;
  }

  login(userCredentials: UserCredentials): Observable<User> {
    return this.http
      .post<User>(this.userUrl, userCredentials, this.httpOptions)
      .pipe(
        catchError((error) =>
          this.handleError(error as HttpErrorResponse, this.uiService)
        )
      );
  }

  logout() {
    this.store.dispatch(logoutUser());
    localStorage.removeItem("token");
  }

  handleError(error: HttpErrorResponse, uiService: UiService) {
    uiService.hideLoading();
    if (error.error?.error) {
      uiService.showErrorModal(error.error.error as string);
      return throwError(() => error);
    }

    if (error.message) {
      uiService.showErrorModal(error.message);
    }

    return throwError(() => new Error(error.message));
  }
}
