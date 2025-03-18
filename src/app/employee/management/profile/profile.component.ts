import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../auth.service';
import { IncidentModalComponent } from '../modals/incident-modal/incident-modal.component';

interface IncidentNode {
  name: string;
  children?: IncidentNode[];
  incidentType?: { typeName: string };
  dateOccurred?: string;
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
closeDialog() {
throw new Error('Method not implemented.');
}
  activeTab = 0;
  employeeId!: string;
  employee!: any;
  incidentTreeControl = new NestedTreeControl<IncidentNode>(node => node.children);
  incidentDataSource = new MatTreeNestedDataSource<IncidentNode>();

  constructor(
    private route: ActivatedRoute, 
    private authService: AuthService, 
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.employeeId = this.route.snapshot.paramMap.get('userId')!;
    this.loadEmployeeData();
  }

  loadEmployeeData() {
    this.authService.getEmployeeById(this.employeeId).subscribe((data: any) => {
      this.employee = data;
      this.buildTree();
    });
  }

  buildTree() {
    if (!this.employee?.incidents) return;

    const categories = {
      Observations: { name: "Observations", children: [] as IncidentNode[] },
      TestResults: { name: "Test Results", children: [] as IncidentNode[] },
      Incidents: { name: "Incidents", children: [] as IncidentNode[] }
    };

    this.employee.incidents.forEach((incident: any) => {
      const formattedIncident: IncidentNode = {
        name: `${incident.incidentType?.typeName} - ${new Date(incident.dateOccurred).toLocaleDateString()}`,
        incidentType: incident.incidentType,
        dateOccurred: incident.dateOccurred,
        reportedByUser: incident.reportedByUser,
        reportedBy: incident.reportedBy,
        details: incident.details,
      };

      if (incident.type === "Observation") categories.Observations.children.push(formattedIncident);
      else if (incident.type === "Test Result") categories.TestResults.children.push(formattedIncident);
      else categories.Incidents.children.push(formattedIncident);
    });

    this.incidentDataSource.data = [
      { name: "Available Actions", children: Object.values(categories) }
    ];
  }

  hasChild = (_: number, node: IncidentNode) => !!node.children && node.children.length > 0;

  openIncidentDialog(incident: IncidentNode) {
    this.dialog.open(IncidentModalComponent, {
      width: '500px',
      data: incident
    });
  }
}
