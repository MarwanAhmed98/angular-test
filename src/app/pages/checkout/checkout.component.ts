import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../core/services/order/order.service';



@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly OrderService = inject(OrderService);
  MyId: string = '';
  CheckoutForm: FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    city: new FormControl(null, [Validators.required, Validators.pattern(/^[\u0600-\u06FFa-zA-Z\s]+$/)
    ])
  })
  paymentService: any;
  iCartService: any;
  SubmitForm(): void {
    console.log(this.CheckoutForm.value);
    this.GetParaId()
    this.OrderService.CheckoutSession(this.MyId, this.CheckoutForm.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === "success") {
          open(res.session.url, '_self')
        }
      }
    })
  }
  GetParaId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        console.log(res.get('id'));
        this.MyId = res.get('id')!
      }
    })
  }

}
