import { Component } from '@angular/core';
import {FirebaseIntegrationService} from "../Firebase/firebase-integration.service";

@Component({
  selector: 'app-navigationbar',
  templateUrl: './navigationbar.component.html',
  styleUrl: './navigationbar.component.css'
})
export class NavigationbarComponent {
  constructor(public _auth: FirebaseIntegrationService) {}

}
