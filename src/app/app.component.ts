import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { isDevMode } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EmberFrameworksLLC';
  devMode = false;
  constructor(public router: Router, public authService: AuthService) {
    if(isDevMode()) {
        this.devMode = true;
    }
  }

  goTo(path: string) {
    this.router.navigate([path]).then(() => {
        window.location.reload();
      });
  }

}
