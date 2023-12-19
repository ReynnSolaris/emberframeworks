import {Component, OnInit} from '@angular/core';
import { FirebaseIntegrationService } from "./Firebase/firebase-integration.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'EmberFrameworksWebsite';
  constructor(public FireBase: FirebaseIntegrationService) {
    console.log("Initialized Main Application Pool.")
  }
  ngOnInit() {

  }
}
