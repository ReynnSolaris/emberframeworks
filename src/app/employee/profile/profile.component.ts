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
  styleUrls: ['./profile.component.css'] // Fixed typo (was styleUrl)
})
export class ProfileComponent implements OnInit {

    employee: any = {};
    calendarOptions!: CalendarOptions;

    constructor(public authService: AuthService, private dialog: MatDialog) {}

    async ngOnInit(): Promise<void> {
        // Initialize FullCalendar *only after* user data is ready
        this.calendarOptions = {
            initialView: 'timeGridWeek',
            plugins: [timeGridPlugin, dayGridPlugin],
            headerToolbar: {
              left: 'prev,next',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            views: {
              dayGridMonth: { type: 'dayGrid', duration: { month: 1 }, buttonText: 'Month' },
              timeGridWeek: { type: 'timeGrid', duration: { weeks: 1 }, buttonText: 'Week' },
              timeGridDay: { type: 'timeGrid', duration: { days: 1 }, buttonText: 'Day' }
            },
            slotMinTime: '07:00:00',
            slotMaxTime: '17:00:00',
            weekends: false,
            events: []
        };
        this.employee = await this.authService.fetchUserDetails();
        console.log(this.employee);
        this.calendarOptions.events = this.employee?.schedule || [];
    }
    
    async GetEmployeeDetails(): Promise<any> {
        return await this.authService.fetchUserDetails(); // Uses updated async fetch
    }

    isDev(): boolean {
        return isDevMode();
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
