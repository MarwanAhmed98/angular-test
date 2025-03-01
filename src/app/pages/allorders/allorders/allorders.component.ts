

import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { OrderService } from '../../../core/services/order/order.service';
import { IOrders } from '../../../shared/interfaces/iorders';
import { ICartService } from '../../../core/services/ICart/icart.service';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';



@Component({
  selector: 'app-allorders',
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit  {
  private readonly orderService = inject(OrderService)
  private readonly iCartService = inject(ICartService)
  private readonly pLATFORM_ID = inject(PLATFORM_ID)

  MyCart:any=[]
  cartItems: any[] = [];
    userData:any;
  userId:string=''
  ngOnInit(): void {
      if(isPlatformBrowser(this.pLATFORM_ID)){
          if(localStorage.getItem('token') !== undefined){
            this.userData=jwtDecode(localStorage.getItem('token')!)
            console.log(this.userData);
            this.userId=this.userData.id
            console.log(this.userId);
      this.yarabba2()

          }
        }
  }
  yarabba2():void{
    if(isPlatformBrowser(this.pLATFORM_ID)){
      this.orderService.getUsersOrders(this.userId).subscribe({
        next:(res)=>{
          console.log(res);
          this.MyCart=res
          
        }
      })
    }
  }
  
}



