import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { environment } from "../../environments/environment";
import { type Observable } from "rxjs";
import { User, UserCredentials } from "../types";

@Injectable({
  providedIn: "root",
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  private readonly userUrl = `${environment.apiUrl}${environment.paths.users}${environment.paths.login}`;

  constructor(private readonly http: HttpClient) {}

  login(userCredentials: UserCredentials): Observable<User> {
    return this.http.post<User>(
      this.userUrl,
      userCredentials,
      this.httpOptions
    );
  }
}
