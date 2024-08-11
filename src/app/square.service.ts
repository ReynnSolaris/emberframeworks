import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import {
    payments as pf,
    Payments,
    CardOptions
  } from '@square/web-sdk';

@Injectable({
  providedIn: 'root'
})
export class SquareService {


constructor() {
  }

  async requestCardNonce(event: { preventDefault: () => void; }) {
    event.preventDefault();
    var flow: Payments | null = await pf(environment.Square_APP_ID, "LFVFFRHG140JW");
    (await flow?.card({"postalCode": "11111"}))?.attach("#nonce-form")
    return true
  }

  processPayment(nonce: string) {
    // Replace this with your server API call to process the payment
    console.log('Nonce received:', nonce);
  }
}