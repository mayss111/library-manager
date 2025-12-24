import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  books: any[] = [];
  filteredBooks: any[] = [];

  loading = false;
  error: string | null = null;

  searchTerm = '';
  selectedCategory = 'all';
  selectedAvailability = 'all';

  categories: string[] = [];

  constructor(
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.loading = true;
    this.error = null;

    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.extractCategories();
        this.applyFilters();
        this.loading = false;
      },
      error: () => {
        this.error = 'Erreur lors du chargement des livres';
        this.loading = false;
      }
    });
  }

  extractCategories() {
    const cats = this.books
      .map(b => b.category)
      .filter((c: string) => !!c);
    this.categories = Array.from(new Set(cats));
  }

  onFiltersChange() {
    this.applyFilters();
  }

  applyFilters() {
    this.filteredBooks = this.books.filter(b => {
      const matchesSearch =
        !this.searchTerm ||
        b.title?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        b.author?.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesCategory =
        this.selectedCategory === 'all' ||
        b.category === this.selectedCategory;

      const matchesAvailability =
        this.selectedAvailability === 'all' ||
        (this.selectedAvailability === 'available' && b.available) ||
        (this.selectedAvailability === 'unavailable' && !b.available);

      return matchesSearch && matchesCategory && matchesAvailability;
    });
  }

  goToNew() {
    this.router.navigate(['/books/new']);
  }

  showDetails(id: number) {
    this.router.navigate(['/books', id]);
  }

  editBook(id: number) {
    this.router.navigate(['/books', id, 'edit']);
  }

  deleteBook(id: number) {
    if (!confirm('Supprimer ce livre ?')) return;

    this.bookService.deleteBook(id).subscribe({
      next: () => this.loadBooks(),
      error: () => this.error = 'Erreur lors de la suppression'
    });
  }
}
