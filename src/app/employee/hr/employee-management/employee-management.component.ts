import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';
import { environment } from '../../../../environments/environment';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css'],
  providers: [DatePipe]
})
export class EmployeeManagementComponent implements OnInit {

  employees: any[] = [];
  displayedColumns: string[] = ['userId', 'userName', 'fullName', 'role', 'jobTitle', 'salary', 'positionType', 'actions', 'deletedTime'];

  constructor(private datePipe: DatePipe, private router: Router, private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  calculateTimeDifference(deletedTime: string): string {
    const deletedDate = new Date(deletedTime);
    const currentDate = new Date();
    const diffInMs = currentDate.getTime() - deletedDate.getTime();
    const diffInSec = diffInMs / 1000;
    const diffInMin = diffInSec / 60;
    const diffInHours = diffInMin / 60;
    const diffInDays = diffInHours / 24;

    if (diffInDays >= 1) {
      return Math.floor(diffInDays) + ' day(s)';
    } else if (diffInHours >= 1) {
      return Math.floor(diffInHours) + ' hour(s)';
    } else if (diffInMin >= 1) {
      return Math.floor(diffInMin) + ' minute(s)';
    } else {
      return Math.floor(diffInSec) + ' second(s)';
    }
  }

  loadEmployees() {
    this.http.get<any[]>(`${environment.AUTH_API}/employee-management/all`).subscribe(data => {
      this.employees = data;
      console.log(data);
    });
  }

  gotoFile(empId: any) {
        this.router.navigate([`/hr/employee-management/${empId}`]);
    }

  openDialog(employee?: any) {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '500px',
      data: employee ? { ...employee } : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (employee) {
          // Update Employee
          this.http.put(`${environment.AUTH_API}/employee-management/${employee?.userId}`, result).subscribe(() => this.loadEmployees());
        } else {
          // Add Employee
          this.http.post(`${environment.AUTH_API}/employee-management/add`, result).subscribe(() => this.loadEmployees());
        }
      }
    });
  }

  deleteEmployee(employeeId: number) {
    if (confirm("Are you sure you want to delete this employee?")) {
      this.http.delete(`${environment.AUTH_API}/employee-management/${employeeId}`).subscribe(() => this.loadEmployees());
    }
  }
}
