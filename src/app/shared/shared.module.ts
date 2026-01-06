import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { AvailablePipe } from './available.pipe';


@NgModule({
  declarations: [StarRatingComponent, AvailablePipe],
  imports: [CommonModule],
  exports: [StarRatingComponent, AvailablePipe]
})
export class SharedModule {}
