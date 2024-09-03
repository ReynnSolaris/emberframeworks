// src/app/components/chat/chat.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebSocketService, WebSocketMessage } from '../web-socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  template: `
    <h2>WebSocket Chat</h2>
    <div *ngFor="let msg of messages">
      <strong>{{msg.from}}:</strong> {{msg.message}}
    </div>
    <input [(ngModel)]="newMessage" placeholder="Type a message..." />
    <button (click)="send()">Send</button>
  `
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: WebSocketMessage[] = [];
  newMessage: string = '';
  private wsSubscription!: Subscription;

  constructor(private wsService: WebSocketService) { }

  ngOnInit(): void {
    this.wsSubscription = this.wsService.messages$.subscribe((message: WebSocketMessage) => {
      if (message.type === 'broadcast') {
        this.messages.push(message);
      } else if (message.type === 'welcome') {
        console.log(message.message);
      } else if (message.type === 'error') {
        console.error(message.message);
      }
      // Handle other message types as needed
    });
  }

  send(): void {
    if (this.newMessage.trim()) {
      this.wsService.sendMessage({ type: 'broadcast', message: this.newMessage });
      this.newMessage = '';
    }
  }

  ngOnDestroy(): void {
    this.wsSubscription.unsubscribe();
  }
}
