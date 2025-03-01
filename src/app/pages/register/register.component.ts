import { Component, ElementRef, inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  @ViewChildren('My') el!:QueryList<ElementRef>
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  isLoading:boolean=false;
  isSuccess:string="";
  isErr:string="";
  RegisterForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),
    rePassword: new FormControl(null),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),

  }, { validators: this.ConfirmPssword });



  SubmitForm(): void {
    if (this.RegisterForm.valid) {
      this.isLoading=true;
      this.authService.sendRegisterForm(this.RegisterForm.value).subscribe(
        {
          next: (res) => {
            if (res.message == 'success') {
              setTimeout(() => {
                this.router.navigate(['/Login'])
              }, 2500);
              this.isSuccess=res.message;
            }
            console.log(res);
            this.isLoading=false;
          },
          error: (err) => {
            this.isLoading=false;
            this.isErr=err.error.message;
            console.log(err);
          }
        }
      )
      this.ClearForm();
    }
    console.log(this.RegisterForm.value)
  }
  ConfirmPssword(Group: AbstractControl) {
    const password = Group.get('password')?.value;
    const rePassword = Group.get('rePassword')?.value;
    return password == rePassword ? null : { mismatch: true }
  }
  ClearForm():void{
    this.el.forEach((MyElements)=>{
      MyElements.nativeElement.value=''
    })
  }
  Closeee():void{
     this.isErr="";
  }
}
