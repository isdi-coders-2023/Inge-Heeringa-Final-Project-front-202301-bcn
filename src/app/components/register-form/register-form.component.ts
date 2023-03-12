import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-register-form",
  templateUrl: "./register-form.component.html",
  styleUrls: ["./register-form.component.scss"],
})
export class RegisterFormComponent {
  registerForm = this.fb.group({
    username: [
      "",
      [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9_]+$"),
        Validators.minLength(3),
        Validators.maxLength(12),
      ],
    ],
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

  constructor(private readonly fb: FormBuilder) {}
}
