import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent {
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)

  step: number = 1;

  verfyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  })

  ResetCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^\d{6}$/)])
  })

  ResetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),
  })

  Fpassword(): void {
    let EmailValue = this.verfyEmail.get('email')?.value
    this.ResetPassword.get('email')?.patchValue(EmailValue)
    this.authService.ForgetPassword(this.verfyEmail.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.statusMsg === 'success') {
          this.step = 2;
        }
      }
    })
  }
  Code(): void {
    this.authService.VerifyResetCode(this.ResetCode.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'Success') {
          this.step = 3;
        }
      }
    })
  }
  RPassword(): void {
    this.authService.ResetPassword(this.ResetPassword.value).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('token', res.token)
        this.router.navigate(['/Home'])
      }
    })
  }

}
