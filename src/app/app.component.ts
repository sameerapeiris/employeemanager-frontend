import { Component } from '@angular/core';
import { Employee } from './types/types';
import { EmployeeService } from './services/employee.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public employe: Employee[] | undefined;

  constructor(private employeeService: EmployeeService) {}

  public getEmployees(): void {
    this.employeeService.getEmployee().subscribe(
      (response: Employee[]) => {
        this.employe = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
