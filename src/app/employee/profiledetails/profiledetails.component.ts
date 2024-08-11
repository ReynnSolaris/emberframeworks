import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profiledetails',
  templateUrl: './profiledetails.component.html',
  styleUrl: './profiledetails.component.css'
})
export class ProfiledetailsComponent implements OnInit {
    constructor(public authService: AuthService, public router: Router) { }

    goTo(path: string) {
        this.router.navigate([path]).then(() => {
            window.location.reload();
          });
      }
      
    ngOnInit(): void {
      // Initialization logic here
    }
}
