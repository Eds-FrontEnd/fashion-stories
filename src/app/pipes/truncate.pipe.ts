import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: false,
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, maxLenght: number): string {
    return value.length > maxLenght ? value.slice(0, 25) + '...' : value;
  }
}
