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
  public employees: Employee[] = [];

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

  public onOpenModal(employee: Employee | null, mode: string):void{
      const button = document.createElement("button");
      button.style.display = "none";
      button.type = "button";
      button.setAttribute('data-toggle', 'modal');
      document.getElementById("main")?.appendChild(button);
      if(mode === "add"){
        button.setAttribute('data-target', '#addEmployee')
      }
      if(mode ==="edit"){
        button.setAttribute('data-target', '#editEmployee')
      }
      if(mode ==="delete"){
        button.setAttribute('data-target', '#deleteEmployee')
      }
      button.click();
  }

}
