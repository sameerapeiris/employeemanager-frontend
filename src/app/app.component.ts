import { Component, OnInit } from '@angular/core';
import { Employee } from './types/types';
import { EmployeeService } from './services/employee.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public employees: Employee[] | undefined;

  constructor(private employeeService: EmployeeService) {}
  ngOnInit() {
    this.getEmployees();
  }
  public getEmployees(): void {
    this.employeeService.getEmployee().subscribe({
      next: (response: Employee[]) => {
        this.employees = response;
        console.log(response);
      },
      error: (e) => {
        alert(e.message);
      },
    });
  }
}
