import { Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { User, UserCredentials } from "../types";

@Injectable()
export class MockUserService {
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  login(userCredentials: UserCredentials): Observable<User> {
    return of({
      email: userCredentials.email,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJtb2NrQHVzZXIuY29tIiwiaWF0IjoxNTE2MjM5MDIyfQ.YPuy12VqswmM868VyJGPrrNSUWfyTC7GldVz2gLx9vU",
    });
  }
}
