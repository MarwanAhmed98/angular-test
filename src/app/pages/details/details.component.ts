
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';




@Component({
  selector: 'app-details',
  imports: [CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  productId:any;
  productDetails:IProduct={} as IProduct
  private readonly productsService = inject(ProductsService);
  private readonly activatedRoute = inject(ActivatedRoute);


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-circle-arrow-left"></i>', '<i class="fa-solid fa-circle-arrow-right"></i>'],
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

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next:(res)=>{
        console.log(res);
        this.productId=res.get('id');
        console.log(this.productId);
        this.productsService.getSpecificProducts(this.productId).subscribe({
          next:(res)=>{
            console.log(res);
            this.productDetails=res.data
            console.log(this.productDetails);
            
          }
        })
        
      }
    })
  }

}
