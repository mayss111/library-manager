import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  currentId: number | null = null;
  titlePage = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      author: ['', [Validators.required]],
      category: [''],
      publishedYear: [2020, [Validators.required, Validators.min(1900), Validators.max(2100)]],
      available: [true],
      rating: [3, [Validators.min(1), Validators.max(5)]]
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.currentId = Number(idParam);
      this.titlePage = 'Modifier un livre';

      this.bookService.getBookById(this.currentId).subscribe(book => {
        if (book) {
          this.form.patchValue(book);
        }
      });
    } else {
      this.titlePage = 'Ajouter un livre';
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.value;

    if (this.isEditMode && this.currentId !== null) {
      const updated = { id: this.currentId, ...value };
      this.bookService.updateBook(updated).subscribe(() => {
        this.router.navigate(['/books']);
      });
    } else {
      this.bookService.addBook(value).subscribe(() => {
        this.router.navigate(['/books']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/books']);
  }
}
