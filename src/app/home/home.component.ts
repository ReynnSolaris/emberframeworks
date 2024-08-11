import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('someAnimation', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate('900ms ease-in', style({ opacity: 1 }))
        ]),
        transition(':leave', [
            style({ opacity: 1 }),
            animate('900ms ease-in', style({ opacity: 0 }))
        ])
    ]),
  ]
})
export class HomeComponent implements OnInit {
  loaded: boolean = false;
  containerClass: string = "container";
  ngOnInit(): void {
    // Simulate loading effect with a delay
    setTimeout(() => {
      this.loaded = true;
      this.containerClass = "container_loaded";
    }, 500);
    
  }
}
