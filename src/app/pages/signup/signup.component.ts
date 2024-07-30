import { Component } from "@angular/core";
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { DefaultLoginLayoutComponent } from "../../components/default-login-layout/default-login-layout.component";
import { PrimaryInputComponent } from "../../components/primary-input/primary-input.component";
import { LoginService } from "../../services/login.service";



interface SignupForm {
  name: FormControl,
  email: FormControl,
  password: FormControl,
  passwordConfirm: FormControl,
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [
    LoginService
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm!: FormGroup<SignupForm>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService,
  ) {
    this.signupForm = new FormGroup<SignupForm>({
      name: new FormControl<string>("", [Validators.required, Validators.minLength(3)]),
      email: new FormControl<string>("", [Validators.required, Validators.email]),
      password: new FormControl<string>("", [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl<string>("", [Validators.required, Validators.minLength(6)])
    })
  }

  // submit() {
  //   if (this.signupForm.valid) {
  //     const { email, password } = this.signupForm.value;
  //     this.loginService.login(email!, password!).subscribe({
  //       next: () => this.toastr.success("Signup successful"),
  //       error: () => this.toastr.error("Unexpected error! Please try again later.")
  //     });
  //   } else {
  //     this.toastr.error("Please fill out the form correctly.");
  //   }
  // }

  submit() {
    this.loginService.signup(this.signupForm.value.name, this.signupForm.value.email, this.signupForm.value.password).subscribe({
      next: () => this.toastr.success("Login feito com sucesso!"),
      error: () => this.toastr.error("Erro inesperado! Tente novamente mais tarde.")
    })
  }

  navigate() {
    this.router.navigate(["login"])
  }
}
