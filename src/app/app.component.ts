import {Component, OnInit, AfterViewInit} from '@angular/core';
import { FirebaseIntegrationService } from "./Firebase/firebase-integration.service";
import {ApiIntegrationService} from "./API/api-integration.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'EmberFrameworksWebsite';
  public isAuthenticated = false;

  constructor(public FireBase: FirebaseIntegrationService, private router: Router, public ApiRef: ApiIntegrationService) {
    }
  ngOnInit() {

  }

  ngAfterViewInit() {

  }

}
