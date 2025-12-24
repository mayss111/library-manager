import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = 'http://localhost:3000/books';

  constructor(private http: HttpClient) {}

  // GET all books
  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // GET book by id
  getBookById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  // POST create new book
  addBook(book: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, book);
  }

  // PUT update book
  updateBook(book: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${book.id}`, book);
  }

  // DELETE book
  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
