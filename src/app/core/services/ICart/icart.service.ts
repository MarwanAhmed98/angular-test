import { HttpClient } from '@angular/common/http';
import {inject, Injectable, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import {  Observable } from 'rxjs';
import { environment } from '../../../shared/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ICartService  {
  constructor(private readonly httpClient: HttpClient ) {}
  private readonly pLATFORM_ID = inject(PLATFORM_ID)
  cartNumber:WritableSignal<number>=signal(0)
  CartOwner:string=''
  AddProductToCart(id: string): Observable<any> {
    return this.httpClient.post(environment.baseUrl+'/api/v1/cart',
      {
        "productId": id
      }
    )
  }
  GetLoggedData(): Observable<any> {
    return this.httpClient.get(environment.baseUrl+'/api/v1/cart')
  }
  RemoveCartItem(id: string): Observable<any> {
    return this.httpClient.delete(environment.baseUrl+`/api/v1/cart/${id}`
    )
  }
  UpdateCartItem(id:string,newCount:number): Observable<any> {
    return this.httpClient.put(environment.baseUrl+`/api/v1/cart/${id}`,
      {
        "count": newCount
      }
    )
  }
  ClearCart():Observable<any>{
    return this.httpClient.delete(environment.baseUrl+'/api/v1/cart'
    )
  }
}
