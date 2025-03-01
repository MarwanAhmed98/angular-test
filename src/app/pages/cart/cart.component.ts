import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ICartService } from '../../core/services/ICart/icart.service';
import { ICart } from '../../shared/interfaces/icart';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../core/services/order/order.service';
import { TranslatePipe } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-cart',
  imports: [SweetAlert2Module, RouterLink, TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  CartDetails: ICart = {} as ICart
  private readonly iCartService = inject(ICartService);
  private readonly orderService = inject(OrderService);
    private readonly pLATFORM_ID = inject(PLATFORM_ID)
    userData:any;
  userId:string=''

  ngOnInit(): void {
    this.GetUserData()
          if(isPlatformBrowser(this.pLATFORM_ID)){
              if(localStorage.getItem('token') !== undefined){
                this.userData=jwtDecode(localStorage.getItem('token')!)
                console.log(this.userData);
                this.userId=this.userData.id
                console.log(this.userId);
              }
            }
    console.log(this.userId);
    
    this.yarabba2(this.userId)
  }
  GetUserData(): void {
    if(isPlatformBrowser(this.pLATFORM_ID)){
      this.iCartService.GetLoggedData().subscribe({
        next: (res) => {
          console.log(res.data);
          console.log(res.data.cartOwner);
          this.CartDetails = res.data;
        }
      })
    }
  }
  RemoveItem(id: string): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.iCartService.RemoveCartItem(id).subscribe({
          next: (res) => {
            console.log(res);
            this.CartDetails = res.data;
            this.iCartService.cartNumber.set(res.numOfCartItems)
            Swal.fire({
              title: "Deleted!",
              text: "Your Product has been deleted.",
              icon: "success"
            });
          }
        });
      }
    });
  }

  UpdateItem(id: string, count: number): void {
    this.iCartService.UpdateCartItem(id, count).subscribe({
      next: (res) => {
        console.log(res.data);
        this.CartDetails = res.data;
      }
    })
  }
  Clear(): void {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to clear your Cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Clear it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.iCartService.ClearCart().subscribe({
          next: (res) => {
            console.log(res);
            this.CartDetails = {} as ICart;
            this.iCartService.cartNumber.set(0)
            Swal.fire({
              title: "Cleared!",
              text: "Your Cart has been cleared.",
              icon: "success"
            });
          }
        });
      }
    });
  }
  yarabba2(id:any):void{
    if(isPlatformBrowser(this.pLATFORM_ID)){
      this.orderService.getUsersOrders(id).subscribe({
        next:(res)=>{
          console.log(res);
          
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
    }
  }
}
