import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  template: `
    <span class="stars">
      <ng-container *ngFor="let star of starsArray; let i = index">
        <span [class.filled]="i < rating">&#9733;</span>
      </ng-container>
    </span>
  `,
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent {
  @Input() rating = 0;
  starsArray = [1, 2, 3, 4, 5];
}
