import { RouterLink } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { ToastrService } from 'ngx-toastr';
import { ICartService } from '../../core/services/ICart/icart.service';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';

@Component({
  selector: 'app-products',
  imports: [RouterLink , FormsModule , SearchPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  text:string=''
  products: IProduct[] = [];
  private readonly productsService = inject(ProductsService)
  private readonly iCartService = inject(ICartService)
  private readonly toastrService = inject(ToastrService)



  ngOnInit(): void {
    this.getProducts()
  }
  getProducts(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.products = res.data
      }
    })
  }
  AddProduct(id: string): void {
    this.iCartService.AddProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.toastrService.success(res.message, "FresCart")
        this.iCartService.cartNumber.set(res.numOfCartItems)
      }
    })
  }
}
