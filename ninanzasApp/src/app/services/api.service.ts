import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:8000';

  constructor(private httpClient: HttpClient) { }

  login(data: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/login/`, data);
  }

  register(data: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/register/`, data);
  }

  getCategories(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/categories/`);
  }

  addCategory(category: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/categories/`, category);
  }

  deleteCategory(categoryId: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/categories/${categoryId}/`);
  }

  getTransactions(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/transactions/`);
  }

  addTransaction(transaction: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/transactions/`, transaction);
  }

  deleteTransaction(transactionId: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/transactions/${transactionId}/`);
  }

  getBudgets(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/budgets/`);
  }

  getDashboard(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/dashboard/`);
  }
}
