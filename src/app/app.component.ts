import { Component, OnInit } from '@angular/core';
import { Employee } from './types/types';
import { EmployeeService } from './services/employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public employees?: Employee[];
  public editEmloyee?: Employee;
  public empl:any[] = []

  constructor(private employeeService: EmployeeService) {}
  ngOnInit() {
    this.getEmployees();
  }
  public getEmployees(): void {
    this.employeeService.getEmployee().subscribe({
      next: (response: Employee[]) => {
        this.employees = response;
        console.log(response);
        this.empl = response.map(employee =>{
          const namePart = employee.name.split(" ");
          const firstName = namePart[0];
          return {...employee, firstName}

        })
      },
      error: (e) => {
        alert(e.message);
      },
    });
  }

  public onAddEmployee(addForm: NgForm): void {
    document.getElementById('addButtonClose')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe({
      next: (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      error: (e) => {
        alert(e.message);
        addForm.reset();
      },
    });
  }

  public onUpdateEmployee(employee: Employee): void {

    this.employeeService.updateEmployee(employee).subscribe({
      next: (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      error: (e) => {
        alert(e.message);
      },
    });
  }

  public onOpenModal(employee?: Employee, mode?: string): void {
    const container = document.getElementById('main');
    const button = document.createElement('button');
    button.style.display = 'none';
    button.type = 'button';
    button.setAttribute('data-toggle', 'modal');
    document.getElementById('main')?.appendChild(button);
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployee');
    }
    if (mode === 'edit') {
      this.editEmloyee = employee;
      button.setAttribute('data-target', '#editEmployee');
    }
    if (mode === 'delete') {
      button.setAttribute('data-target', '#deleteEmployee');
    }
    container?.appendChild(button);
    button.click();
  }
}
