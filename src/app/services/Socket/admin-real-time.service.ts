import {Injectable, OnDestroy, OnInit} from '@angular/core';
import { io, ManagerOptions, SocketOptions } from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminRealTimeService implements OnInit, OnDestroy {
  private socket: any;
  private unsubscribe$ = new Subject<void>();

  constructor() {
    console.log('Initializing socket...');
    this.socket = io('/websocket', {withCredentials: true});
    console.log('Socket initialized:', this.socket);
  }

  ngOnInit(): void {

  }

  getAdminUpdates(): Observable<any> {
    return new Observable((observer) => {
      this.socket?.on('userUpdate', (data: any) => {
        console.log(data);
        observer.next(data);
      });
    }).pipe(takeUntil(this.unsubscribe$));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
