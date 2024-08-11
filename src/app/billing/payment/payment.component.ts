// src/app/components/payment/payment.component.ts
import { Component, OnInit } from '@angular/core';
import { SquareService } from '../../square.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private squareService: SquareService) { }

  ngOnInit(): void {
  }

  onGetCardNonce(event: Event): void {
    this.squareService.requestCardNonce(event);
  }
}