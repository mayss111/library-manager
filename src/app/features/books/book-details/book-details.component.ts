import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book: any;
  loading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      this.router.navigate(['/books']);
      return;
    }
    const id = Number(idParam);
    this.loadBook(id);
  }

  loadBook(id: number) {
    this.loading = true;
    this.error = null;

    this.bookService.getBookById(id).subscribe({
      next: (data) => {
        this.book = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Livre introuvable';
        this.loading = false;
      }
    });
  }

  back() {
    this.router.navigate(['/books']);
  }
}
