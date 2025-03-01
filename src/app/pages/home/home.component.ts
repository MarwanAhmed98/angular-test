import { OwlOptions } from './../../../../node_modules/ngx-owl-carousel-o/lib/models/owl-options.model.d';
import { IProduct } from '../../shared/interfaces/iproduct';
import { ICategories } from '../../shared/interfaces/icategories';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { RouterLink } from '@angular/router';
import { ICartService } from '../../core/services/ICart/icart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-home',
  imports: [CarouselModule, FormsModule, SearchPipe, RouterLink , TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  text: string = ""
  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly iCartService = inject(ICartService);
  private readonly toastrService = inject(ToastrService);

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    rtl:true,
    autoplay: true,
    autoplayMouseleaveTimeout: 1000,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-arrow-right"></i>', '<i class="fa-solid fa-arrow-left"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  products: IProduct[] = [];
  Category: ICategories[] = [];
  ngOnInit(): void {
    this.getAllProductsData();
    this.getAllCategoryData()
  }

  getAllProductsData(): void {
    this.productsService.getAllProducts().subscribe(
      {
        next: (res) => {
          console.log(res.data);
          this.products = res.data
        }
      }
    )
  }
  getAllCategoryData(): void {
    this.categoriesService.getAllCategories().subscribe(
      {
        next: (res2) => {
          console.log(res2.data);
          this.Category = res2.data
        }
      }
    )
  }
  AddProduct(id:string):void{
    this.iCartService.AddProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res)
        this.toastrService.success(res.message,'FreshCart')
        this.iCartService.cartNumber.set(res.numOfCartItems)
      }
    })
  }
}

