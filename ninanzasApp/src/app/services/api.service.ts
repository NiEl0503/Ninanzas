import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login/`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register/`, data);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories/`);
  }

  getTransactions(): Observable<any> {
    return this.http.get(`${this.baseUrl}/transactions/`);
  }

  getBudgets(): Observable<any> {
    return this.http.get(`${this.baseUrl}/budgets/`);
  }
}

