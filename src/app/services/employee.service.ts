import { Injectable } from '@angular/core';
import { Employee } from '../types/types';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { envvironment } from '../env/env';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiBaseUrl = envvironment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiBaseUrl}/employee/all`);
  }

  public addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(
      `${this.apiBaseUrl}/employee/add`,
      employee
    );
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(
      `${this.apiBaseUrl}/employee/update`,
      employee
    );
  }

  public deleteEmployee(id?: number): Observable<Employee> {
    return this.http.delete<Employee>(
      `${this.apiBaseUrl}/employee/delete/${id}`
    );
  }
}
