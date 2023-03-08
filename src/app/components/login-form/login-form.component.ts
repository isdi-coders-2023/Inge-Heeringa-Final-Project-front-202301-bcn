import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

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

  constructor(private fb: FormBuilder) {}

  getErrorMessageEmail() {
    if (this.loginForm.controls["email"].hasError("required")) {
      return "You must enter an email address";
    }

    return this.loginForm.controls["email"].hasError("email" || "pattern")
      ? "Not a valid email"
      : "";
  }

  getErrorMessagePassword() {
    if (this.loginForm.controls["password"].hasError("required")) {
      return "You must enter a password";
    }

    if (this.loginForm.controls["password"].hasError("minlength")) {
      return "Password must be at least 8 characters long";
    }

    return this.loginForm.controls["password"].hasError("maxlength")
      ? "Maximum password length is 20 characters"
      : "";
  }
}
