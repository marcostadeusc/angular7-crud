import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Employee } from './employee';

const httpOptions = {
  headers: new HttpHeaders({'Access-Control-Allow-Origin':'http://localhost:4200', 'Content-Type': 'application/json'})
};
const apiUrl = "https://localhost:44396/api/employees";
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getEmployees (): Observable<Employee[]> {
    const url = `${apiUrl}/list`
    console.log("url: " + url);
    return this.http.get<Employee[]>(url)
      .pipe(
        tap(heroes => console.log('fetched employees')),
        catchError(this.handleError('getEmployees', []))
      );
  }
  
  getEmployee(id: number): Observable<Employee> {
    const url = `${apiUrl}/list?id=${id}`;
    console.log("const url: " + url);
    return this.http.get<Employee>(url).pipe(
      tap(_ => console.log(`fetched employee id=${id}`)),
      catchError(this.handleError<Employee>(`getEmployee id=${id}`))
    );
  }
  
  addEmployee (employee): Observable<Employee> {
    const url = `${apiUrl}/create`;
    return this.http.post<Employee>(url, employee, httpOptions).pipe(
      tap((employee: Employee) => console.log(`added employee`)),
      catchError(this.handleError<Employee>('addEmployee'))
    );
  }
  
  updateEmployee (id, employee): Observable<any> {
    const url = `${apiUrl}/update?id=${id}`;
    return this.http.put(url, employee, httpOptions).pipe(
      tap(_ => console.log(`updated employee id=${id}`)),
      catchError(this.handleError<any>('updateEmployee'))
    );
  }
  
  deleteEmployee (id): Observable<Employee> {
    const url = `${apiUrl}/delete?id=${id}`;
  
    return this.http.delete<Employee>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted employee id=${id}`)),
      catchError(this.handleError<Employee>('deleteEmployee'))
    );
  }
  

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
