import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'available'
})
export class AvailablePipe implements PipeTransform {
  transform(value: boolean): string {
    return value ? 'Disponible' : 'Emprunté';
  }
}
