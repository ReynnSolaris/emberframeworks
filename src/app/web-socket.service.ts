// src/app/services/websocket.service.ts
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../environments/environment';
import { isPlatformBrowser } from '@angular/common';

export interface WebSocketMessage {
  type: string;
  message?: string;
  user?: any;
  from?: string;
}

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private ws!: WebSocket;
  private messagesSubject = new Subject<WebSocketMessage>();
  public messages$ = this.messagesSubject.asObservable();
  private readonly platformId = inject(PLATFORM_ID);
  constructor(private authService: AuthService) { }

  connect(): void {
    if (isPlatformBrowser(this.platformId)) {
        const token = localStorage.getItem('token');  // Implement getToken to retrieve the JWT token
        if (!token) {
        console.error('No JWT token found. Cannot establish WebSocket connection.');
        return;
        }

        // Establish WebSocket connection with the token as a query parameter
        this.ws = new WebSocket(`${environment.wsUrl}?token=${encodeURIComponent(token)}`);

        this.ws.onopen = () => {
        console.log('WebSocket connection established.');
        };

        this.ws.onmessage = (event) => {
        try {
            const data: WebSocketMessage = JSON.parse(event.data);
            this.messagesSubject.next(data);
        } catch (err) {
            console.error('Error parsing WebSocket message:', err);
        }
        };

        this.ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        this.ws.onclose = (event) => {
        console.log('WebSocket connection closed:', event);
        // Optionally implement reconnection logic here
        };
    }
  }

  sendMessage(message: any): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not open. Ready state:', this.ws.readyState);
    }
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
    }
  }
}
