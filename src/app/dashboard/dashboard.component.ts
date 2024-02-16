import {Component, OnInit} from '@angular/core';
import {FirebaseIntegrationService} from "../Firebase/firebase-integration.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import { AdminRealTimeService } from '../services/Socket/admin-real-time.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  friends = [
    {
      name: 'Alice Smith',
      avatar: 'assets/profile-picture.png',
      bio: 'Traveler | Foodie | Music Lover'
    },
    {
      name: 'Bob Johnson',
      avatar: 'assets/profile-picture.png',
      bio: 'Developer | Gamer | Fitness Enthusiast'
    },
    // Add more friends as needed
  ];


  notifications = [
    {
      icon: 'notifications',
      message: 'You have a new follower!',
      timestamp: new Date()
    },
    {
      icon: 'thumb_up',
      message: 'Your post was liked!',
      timestamp: new Date()
    },
    // Add more notifications as needed
  ];
  constructor(private adminRealTimeService: AdminRealTimeService, public _auth: FirebaseIntegrationService, private router: Router, private matDialog: MatDialog) {
    const navigation = this.router.getCurrentNavigation();
    var st = navigation.extras.state;
    if (st != null) {
      if (st.hasOwnProperty('reason')) {
        if (st['reason'] == "resentEmail") {
          console.log("was resent an email.")
        }
      }
    }
    this.adminRealTimeService.getAdminUpdates().subscribe(data => {
      console.log('Received update:', data);
    });
  }

  ngOnInit() {

  }

  async sendEmailVerification() {
    if (this._auth.user != null) {
      var log = await this._auth.sendEmailVerification(this._auth.user);
      console.log(log);
    }
  }
}
