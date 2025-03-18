import { DOCUMENT } from '@angular/common';
import { AfterContentInit, Component, Inject, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent implements OnInit, AfterContentInit {
    url: string = "https://square.site/appointments/buyer/widget/s3ed5dmj18x4am/LBND88Z892YCN.js";
    loaded: boolean = false;
    constructor(
        private renderer2: Renderer2,
        @Inject(DOCUMENT) private _document: Document
      ) {
    }

    ngAfterContentInit(): void {

    }

    ngOnInit() {
        let scripts = this._document.getElementById("apt-inner")!.getElementsByTagName("script");
        for (var i = 0; i < scripts.length; i++) {
          if (scripts[i].src) scripts[i].remove();
        }
        let frames = this._document.getElementById("apt-inner")!.getElementsByTagName("iframe");
        for (var i = 0; i < frames.length; i++) {
          if (frames[i].src) frames[i].remove();
        }
        const s = this.renderer2.createElement('script');
        s.type = 'text/javascript';
        s.src = this.url;
        s.text = ``;
        this.renderer2.appendChild(this._document.getElementById("apt-inner"), s);
    }
}
