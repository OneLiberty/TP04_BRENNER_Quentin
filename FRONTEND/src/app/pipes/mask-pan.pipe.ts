import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskPan',
  standalone: true
})
export class MaskPanPipe implements PipeTransform {
  transform(value: string): string {
    /* Mask the first 3 digits (for the CVV) we could just not show it, 
    but for training purposes i'm doing it like that */ 
    if (value.length === 3) {
      return value.replace(/\d/g, '*'); 
    /* Mask the first 12 digits, used for the card number. */
    } else {
      return value.replace(/\d(?=\d{4})/g, '*').replace(/.(?=.{4})/g, '*');
    }
  }
}
