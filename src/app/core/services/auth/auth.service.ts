import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';
import { environment } from '../../../shared/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly router = inject(Router)
  DecodeData: any
  constructor(private httpClient: HttpClient) { }
  sendRegisterForm(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + '/api/v1/auth/signup', data)
  }
  sendLoginForm(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + '/api/v1/auth/signin', data)
  }
  getUserData(): void {
    this.DecodeData = jwtDecode(localStorage.getItem('token')!)
  }
  SignOut(): void {
    localStorage.removeItem("token");
    this.DecodeData = null;
    this.router.navigate(['/Login']);
  }
  ForgetPassword(data:object):Observable<any>{
    return this.httpClient.post(environment.baseUrl+`/api/v1/auth/forgotPasswords` , data)
  }
  VerifyResetCode(data:object):Observable<any>{
    return this.httpClient.post(environment.baseUrl+`/api/v1/auth/verifyResetCode` , data)
  }
  ResetPassword(data:object):Observable<any>{
    return this.httpClient.put(environment.baseUrl+`/api/v1/auth/resetPassword` , data)
  }
}
