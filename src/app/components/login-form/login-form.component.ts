import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { UserCredentials } from "src/app/types";
import { UserService } from "src/app/services/user.service";

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
    private readonly userService: UserService
  ) {}

  onSubmit() {
    const userCredentials: UserCredentials = {
      email: this.loginForm.controls.email.value!,
      password: this.loginForm.controls.password.value!,
    };

    this.userService.login(userCredentials).subscribe();
  }

  getErrorMessageEmail() {
    const emailControl = this.loginForm.controls.email;

    if (emailControl.hasError("required")) {
      return "You must enter an email address";
    }

    if (emailControl.hasError("pattern")) {
      return "Not a valid email";
    }

    return "";
  }

  getErrorMessagePassword() {
    const passwordControl = this.loginForm.controls.password;

    if (passwordControl.hasError("required")) {
      return "You must enter a password";
    }

    if (passwordControl.hasError("minlength")) {
      return "Password must be at least 8 characters long";
    }

    if (passwordControl.hasError("maxlength")) {
      return "Maximum password length is 20 characters";
    }

    return "";
  }
}
