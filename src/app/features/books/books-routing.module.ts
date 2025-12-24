import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksListComponent } from './books-list/books-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookFormComponent } from './book-form/book-form.component';

const routes: Routes = [
  { path: '', component: BooksListComponent },
  { path: 'new', component: BookFormComponent },
  { path: ':id', component: BookDetailsComponent },
  { path: ':id/edit', component: BookFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule {}
