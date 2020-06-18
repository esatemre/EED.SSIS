import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Employee } from './contracts';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private readonly baseUrl: string) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl + 'employee').pipe(catchError(this.errorHandler));
  }

  getById(id: number): Observable<Employee> {
    return this.http.get<Employee>(this.baseUrl + 'employee/' + (id || '')).pipe(catchError(this.errorHandler));
  }

  create(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.baseUrl + 'employee', JSON.stringify(employee), this.httpOptions).pipe(catchError(this.errorHandler));
  }

  update(id, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(this.baseUrl + 'employee/' + id, JSON.stringify(employee), this.httpOptions).pipe(catchError(this.errorHandler));
  }
  delete(id) {
    return this.http.delete(this.baseUrl + 'employee/' + id, this.httpOptions).pipe(catchError(this.errorHandler));
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

} 
