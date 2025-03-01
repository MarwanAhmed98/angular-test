
import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable, OnInit, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment';
import { jwtDecode } from "jwt-decode";
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class OrderService{
  constructor(private readonly httpClient: HttpClient) { }
  private readonly pLATFORM_ID = inject(PLATFORM_ID)
  userData:any;
  userId:string=''
  DecodeData: any;

  
  CheckoutSession(id:string, data:object): Observable<any> {
    
    return this.httpClient.post(environment.baseUrl + `/api/v1/orders/checkout-session/${id}?url=${window.location.origin}`,
      {
        "shippingAddress": data
      }
    )
  }
  getUsersOrders(id:string):Observable<any>{
    console.log(window.location);
     return this.httpClient.get(environment.baseUrl+`/api/v1/orders/user/${id}`)
  }

}


