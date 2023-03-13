import { Inject, Injectable } from "@angular/core";
import {
  HttpClient,
  type HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { catchError, throwError, type Observable } from "rxjs";
import { type User, type UserCredentials } from "../../store/user/types";
import { UiService } from "../ui/ui.service";
import { loginUser, logoutUser } from "../../store/user/user.actions";
import { Store } from "@ngrx/store";
import { type UserRegisterData, type UserRegisterResponse } from "../../types";
import { environment } from "../../../environments/environment.prod";

@Injectable({
  providedIn: "root",
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  private readonly userLoginUrl = `${environment.apiUrl}${environment.paths.users}${environment.paths.login}`;
  private readonly userRegisterUrl = `${environment.apiUrl}${environment.paths.users}${environment.paths.register}`;

  constructor(
    @Inject(HttpClient) private readonly http: HttpClient,
    @Inject(UiService) private readonly uiService: UiService,
    @Inject(Store) private readonly store: Store
  ) {}

  public get userLoginEndpoint(): string {
    return this.userLoginUrl;
  }

  public get userRegisterEndpoint(): string {
    return this.userRegisterUrl;
  }

  getToken(userCredentials: UserCredentials): Observable<User> {
    return this.http
      .post<User>(this.userLoginUrl, userCredentials, this.httpOptions)
      .pipe(
        catchError((error) =>
          this.handleError(error as HttpErrorResponse, this.uiService)
        )
      );
  }

  login(user: User) {
    this.store.dispatch(loginUser({ payload: user }));
  }

  logout() {
    this.store.dispatch(logoutUser());
    localStorage.removeItem("token");
  }

  register(registerData: UserRegisterData): Observable<UserRegisterResponse> {
    return this.http
      .post<UserRegisterResponse>(
        this.userRegisterUrl,
        registerData,
        this.httpOptions
      )
      .pipe(
        catchError((error) =>
          this.handleError(error as HttpErrorResponse, this.uiService)
        )
      );
  }

  handleError(error: HttpErrorResponse, uiService: UiService) {
    uiService.hideLoading();
    if (error.error?.error) {
      uiService.showErrorModal(error.error.error as string);
    }

    if (error.message) {
      uiService.showErrorModal(error.message);
    }

    return throwError(() => new Error(error.message));
  }
}
