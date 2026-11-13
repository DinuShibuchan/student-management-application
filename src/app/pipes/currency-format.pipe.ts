import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
  standalone: true
})
export class CurrencyFormatPipe implements PipeTransform {
  /**
   * Formats numbers into currency format (Bonus Task 3).
   * Example: 5000 -> ₹5,000.00 or $5,000
   */
  transform(value: number | string | null | undefined, currencySymbol: string = '₹'): string {
    if (value === null || value === undefined || isNaN(Number(value))) {
      return `${currencySymbol}0.00`;
    }

    const num = Number(value);
    const formatted = num.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    return `${currencySymbol}${formatted}`;
  }
}

