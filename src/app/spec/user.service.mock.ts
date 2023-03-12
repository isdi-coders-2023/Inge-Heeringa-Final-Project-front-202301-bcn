import { Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { type Observable, of } from "rxjs";
import { type User, type UserCredentials } from "../store/user/types";
import { type UserRegisterData, type UserRegisterResponse } from "../types";

@Injectable()
export class MockUserService {
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  getToken(userCredentials: UserCredentials): Observable<User> {
    return of({
      email: userCredentials.email,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJtb2NrQHVzZXIuY29tIiwiaWF0IjoxNTE2MjM5MDIyfQ.YPuy12VqswmM868VyJGPrrNSUWfyTC7GldVz2gLx9vU",
    });
  }

  login() {
    return of();
  }

  register(registerData: UserRegisterData): Observable<UserRegisterResponse> {
    return of({
      message: "Register successful",
    });
  }
}
