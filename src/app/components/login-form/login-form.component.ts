import decode from "jwt-decode";
import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { UserService } from "../../services/user/user.service";
import { CustomTokenPayload } from "../../types";
import { Store } from "@ngrx/store";
import { loginUser } from "../../store/user/actions/user.actions";
import { UserCredentials } from "../../store/user/types";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent {
  loginForm = this.fb.group({
    email: [
      "",
      [
        Validators.required,
        Validators.email,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
      ],
    ],
    password: [
      "",
      [Validators.required, Validators.minLength(8), Validators.maxLength(20)],
    ],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly store: Store
  ) {}

  onSubmit() {
    const userCredentials = this.loginForm.value as UserCredentials;

    this.userService.login(userCredentials).subscribe(async (data) => {
      const { token } = data;

      const { email } = decode(token) as CustomTokenPayload;

      localStorage.setItem("token", token);

      this.store.dispatch(loginUser({ payload: { email, token } }));
    });
  }
}
