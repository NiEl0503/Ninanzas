import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  newCategory: { name: string } = { name: '' };
  errorMessage: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.apiService.getCategories().subscribe(response => {
      this.categories = response;
    }, error => {
      console.error(error);
      this.errorMessage = 'Error al cargar las categorías: problema del servidor o datos incorrectos 😱';
    });
  }

  onAddCategory(): void {
    this.apiService.addCategory(this.newCategory).subscribe(response => {
      this.loadCategories();
      this.newCategory = { name: '' };
    }, error => {
      console.error(error);
      this.errorMessage = 'Error al agregar la categoría: problema del servidor o datos incorrectos 😱';
    });
  }

  onDeleteCategory(categoryId: number): void {
    this.apiService.deleteCategory(categoryId).subscribe(response => {
      this.loadCategories();
    }, error => {
      console.error(error);
      this.errorMessage = 'Error al eliminar la categoría: problema del servidor o datos incorrectos 😱';
    });
  }
}
