import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { CategoriesComponent } from '../categories/categories.component';
import { TransactionsComponent } from '../transactions/transactions.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CategoriesComponent,
    TransactionsComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  totalIncome: number = 0;
  totalExpense: number = 0;
  totalSavings: number = 0;
  transactions: any[] = [];
  budgets: any[] = [];
  categories: any[] = [];
  errorMessage: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getDashboard().subscribe(response => {
      this.totalIncome = response.total_income;
      this.totalExpense = response.total_expense;
      this.totalSavings = response.total_savings;
      this.transactions = response.transactions;
      this.budgets = response.budgets;
      this.categories = response.categories;
    }, error => {
      console.error(error);
      this.errorMessage = 'Error al cargar el dashboard: problema del servidor o datos incorrectos 😱';
    });
  }
}