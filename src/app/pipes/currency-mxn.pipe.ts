import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyMxn',
  standalone: true
})
export class CurrencyMxnPipe implements PipeTransform {
  transform(value: number | string | undefined | null): string {
    if (value === null || value === undefined) return '';
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) return '';
    
    return `$${num.toFixed(2)} MXN`;
  }
}
