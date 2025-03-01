import { Component, ElementRef, inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @ViewChildren('My') el!: QueryList<ElementRef>
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  isLoading: boolean = false;
  isSuccess: string = "";
  isErr: string = "";
  LoginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),
  });



  SubmitForm(): void {
    if (this.LoginForm.valid) {
      this.isLoading = true;
      this.authService.sendLoginForm(this.LoginForm.value).subscribe(
        {
          next: (res) => {
            if (res.message == 'success') {
              setTimeout(() => {
                localStorage.setItem("token", res.token);
                this.router.navigate(['/Home']);
                this.authService.getUserData();
                console.log(this.authService.DecodeData)
              }, 2500);
              this.isSuccess = res.message;
            }
            console.log(res);
            this.isLoading = false;
          },
          error: (err) => {
            this.isLoading = false;
            this.isErr = err.error.message;
            console.log(err);
          }
        }
      )
      this.ClearForm();
    }
    console.log(this.LoginForm.value)
  }
  ClearForm(): void {
    this.el.forEach((MyElements) => {
      MyElements.nativeElement.value = ''
    })
  }
  Closeee(): void {
    this.isErr = "";
  }

}
