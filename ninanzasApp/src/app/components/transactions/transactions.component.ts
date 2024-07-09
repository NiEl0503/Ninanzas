import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [ 
    CommonModule,
    FormsModule
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent implements OnInit {
  @Output() transactionAdded = new EventEmitter<void>();
  @Output() transactionDeleted = new EventEmitter<void>();

  newTransaction: { category: string, amount: number, description: string } = { category: '', amount: 0, description: '' };
  transactions: any[] = [];
  categories: any[] = [];
  errorMessage: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadTransactions();
    this.loadCategories();
  }

  loadTransactions(): void {
    this.apiService.getTransactions().subscribe(response => {
      this.transactions = response;
    }, error => {
      console.error(error);
      this.errorMessage = 'Error al cargar las transacciones: problema del servidor o datos incorrectos 😱';
    });
  }

  loadCategories(): void {
    this.apiService.getCategories().subscribe(response => {
      this.categories = response;
    }, error => {
      console.error(error);
      this.errorMessage = 'Error al cargar las categorías: problema del servidor o datos incorrectos 😱';
    });
  }

  onAddTransaction(): void {
    this.apiService.addTransaction(this.newTransaction).subscribe(response => {
      this.loadTransactions();
      this.newTransaction = { category: '', amount: 0, description: '' };
      this.transactionAdded.emit();
    }, error => {
      console.error(error);
      this.errorMessage = 'Error al agregar la transacción: problema del servidor o datos incorrectos 😱';
    });
  }

  onDeleteTransaction(transactionId: number): void {
    this.apiService.deleteTransaction(transactionId).subscribe(response => {
      this.loadTransactions();
      this.transactionDeleted.emit();
    }, error => {
      console.error(error);
      this.errorMessage = 'Error al eliminar la transacción: problema del servidor o datos incorrectos 😱';
    });
  }
}
