import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../auth.service';
import { IncidentModalComponent } from '../modals/incident-modal/incident-modal.component';

interface EmployeeIncident {
  type: string;             
  incidentType?: { typeName: string };
  dateOccurred: string;
  reportedByUser?: { userName: string };
  reportedBy?: string;
  details?: string;
}

@Component({
  selector: 'app-management-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ManagementProfileComponent implements OnInit {
  activeTab = 0;
  employeeId!: string;
  employee!: any;
  incidents: EmployeeIncident[] = []; // Timeline-based data

  constructor(
    private route: ActivatedRoute, 
    private authService: AuthService, 
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.employeeId = this.route.snapshot.paramMap.get('userId')!;
    this.loadEmployeeData();
  }

  closeDialog() {
    if(this.dialog) {
        this.dialog.closeAll();
    }
  }

  loadEmployeeData() {
    this.authService.getEmployeeById(this.employeeId).subscribe((data: any) => {
      this.employee = data;
      this.buildIncidentTimeline();
    });
  }

  buildIncidentTimeline() {
    if (!this.employee?.incidents) return;

    this.incidents = this.employee.incidents.map((incident: any) => ({
      type: incident.type,
      incidentType: incident.incidentType,
      dateOccurred: incident.dateOccurred,
      reportedByUser: incident.reportedByUser,
      reportedBy: incident.reportedBy,
      details: incident.details,
    }));

    // Sort by most recent first
    this.incidents.sort((a, b) => 
      new Date(b.dateOccurred).getTime() - new Date(a.dateOccurred).getTime()
    );
  }

  openIncidentDialog(incident: EmployeeIncident) {
    this.dialog.open(IncidentModalComponent, {
      width: '500px',
      data: incident
    });
  }
}
