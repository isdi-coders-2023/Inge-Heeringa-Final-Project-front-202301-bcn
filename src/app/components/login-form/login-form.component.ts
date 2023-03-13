import decode from "jwt-decode";
import { Component, Inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { UserService } from "../../services/user/user.service";
import { type CustomTokenPayload } from "../../types";
import { type UserCredentials } from "../../store/user/types";
import { Store } from "@ngrx/store";
import { loginUser } from "../../store/user/user.actions";
import { UiService } from "../../services/ui/ui.service";
import { Router } from "@angular/router";

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
    @Inject(FormBuilder) private readonly fb: FormBuilder,
    @Inject(UserService) private readonly userService: UserService,
    @Inject(UiService) private readonly uiService: UiService,
    @Inject(Router) public router: Router
  ) {}

  onSubmit() {
    this.uiService.showLoading();

    const userCredentials = this.loginForm.value as UserCredentials;

    this.userService.getToken(userCredentials).subscribe(async (data) => {
      const { token } = data;

      const { email }: CustomTokenPayload = decode(token);

      localStorage.setItem("token", token);

      this.userService.login({ email, token });
      this.uiService.hideLoading();
      await this.router.navigate(["/"]);
    });
  }
}
