import { Component } from '@angular/core';
import {FirebaseIntegrationService} from "../Firebase/firebase-integration.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(public auth: FirebaseIntegrationService) {
  }
}
