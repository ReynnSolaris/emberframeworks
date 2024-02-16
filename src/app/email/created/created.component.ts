import { Component } from '@angular/core';
import {FirebaseIntegrationService} from "../../Firebase/firebase-integration.service";

@Component({
  selector: 'app-created',
  templateUrl: './created.component.html',
  styleUrl: './created.component.css'
})
export class CreatedComponent {
  enabled = true;
  constructor(public _auth: FirebaseIntegrationService) {

  }
}
