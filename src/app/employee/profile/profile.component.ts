import { Component, OnInit, AfterContentInit, isDevMode } from '@angular/core';
import { AuthService } from '../../auth.service';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import { MatDialog } from '@angular/material/dialog';
import { EventDetailsComponent } from '../../event-details/event-details.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit, AfterContentInit {
    employee: any;
    calendarOptions!: CalendarOptions;
    constructor(public authService: AuthService, private dialog: MatDialog){
        this.authService.setTokenInformation();
    }
    ngAfterContentInit(): void {
        this.employee = this.GetEmployeeDetails();
    }
    GetEmployeeDetails() {
        return this.authService.getEmployeeDetails();
    }

    isDev(): boolean {
        return isDevMode();
    }

    ngOnInit(): void {
        this.calendarOptions = {
            initialView: 'timeGridWeek',
            events: this.GetEmployeeDetails().schedule,
            eventClick: this.handleEventClick.bind(this),
            plugins: [timeGridPlugin, dayGridPlugin],
            themeSystem: 'standard',
            slotMinTime: '07:00:00',
            slotMaxTime: '17:00:00',
            weekends: false,
            headerToolbar: {
                left: 'prev,next',
                center: 'title',
                right: 'timeGridMonth,timeGridWeek,timeGridDay' // user can switch between the two
              },
              views: {
                timeGridMonth: {
                    type: 'dayGrid',
                    duration: { month: 1 },
                    buttonText: 'month'
                }
              }
          };
    }

    handleEventClick(info: EventClickArg): void {
        this.dialog.open(EventDetailsComponent, {
          data: {
            title: info.event.title,
            date: info.event.startStr
          }
        });
      }
    
    renderEventContent(eventInfo: any): HTMLElement {
        const container = document.createElement('div');
        const title = document.createElement('div');
        title.innerHTML = eventInfo.event.title;
        title.className = 'event-title';
        
        const date = document.createElement('div');
        date.innerHTML = eventInfo.event.startStr;
        date.className = 'event-date';
        
        container.appendChild(title);
        container.appendChild(date);
        return container;
      }
}
