import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
  standalone: true
})
export class CapitalizePipe implements PipeTransform {
  /**
   * Transforms input text to uppercase as required.
   * Example: Input: 'a' => Output: 'A'
   * Usage: {{ student.name | capitalize }}
   */
  transform(value: string | null | undefined): string {
    if (!value) {
      return '';
    }
    return value.toUpperCase();
  }
}

