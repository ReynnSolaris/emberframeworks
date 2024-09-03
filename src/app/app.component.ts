import { AfterContentInit, Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { isDevMode } from '@angular/core';
import { WebSocketService, WebSocketMessage } from './web-socket.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {

  private wsSubscription!: Subscription;
  title = 'EmberFrameworksLLC';
  devMode = false;
  constructor(private wsService: WebSocketService, public router: Router, public authService: AuthService) {
    if(isDevMode()) {
        this.devMode = true;
    }
  }

  ngOnInit(): void {
    this.wsService.connect();

    this.wsSubscription = this.wsService.messages$.subscribe((message: WebSocketMessage) => {
      console.log('Received WebSocket message:', message);
      // Handle incoming messages as needed
      // For example, update UI components or notify users
    });
  }

  ngOnDestroy(): void {
    this.wsSubscription.unsubscribe();
    this.wsService.disconnect();
  }

  goTo(path: string) {
    this.router.navigate([path]).then(() => {
        window.location.reload();
      });
  }

}
