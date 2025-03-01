import { Ibrands } from './../../shared/interfaces/ibrands';
import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
  private readonly brandsService = inject(BrandsService)
  brandsDetails:Ibrands[] = [] 

  ngOnInit(): void {
    this.getBrands()
  }

  getBrands():void{
    this.brandsService.getAllBrands().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.brandsDetails=res.data;
        console.log(this.brandsDetails);
        
        
      }
    })
  }
}
