import { AfterContentInit, Component, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { isDevMode } from '@angular/core';
import { WebSocketService, WebSocketMessage } from './web-socket.service';
import { Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {

  private wsSubscription!: Subscription;
  title = 'EmberFrameworksLLC';
  private readonly platformId = inject(PLATFORM_ID);
  devMode = false;
  constructor(private wsService: WebSocketService, public router: Router, public authService: AuthService) {
    if(isDevMode()) {
        this.devMode = true;
    }
  }

  ngOnInit(): void {
    /*
    this.wsService.connect();

    this.wsSubscription = this.wsService.messages$.subscribe((message: WebSocketMessage) => {
      console.log('Received WebSocket message:', message);
      // Handle incoming messages as needed
      // For example, update UI components or notify users
    });
    */
    if (isPlatformBrowser(this.platformId)) {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }
  }

  ngOnDestroy(): void {
    /*
    this.wsSubscription.unsubscribe();
    this.wsService.disconnect();
    */
  }

  goTo(path: string) {
    this.router.navigate([path]).then(() => {
        window.location.reload();
      });
  }

}
