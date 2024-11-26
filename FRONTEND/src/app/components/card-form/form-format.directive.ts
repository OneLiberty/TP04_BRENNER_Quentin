// This directive is used to format the card number and expiration date inputs in the card-form component.

import { Directive, HostListener, Input, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appFormFormat]',
  standalone: true,
})
export class FormFormatDirective {
  @Input('appFormFormat') formatType!: string;

  constructor(@Optional() @Self() private ngControl: NgControl) {}

  @HostListener('input', ['$event'])
  onInputChange(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\s+/g, '');

    if (this.formatType === 'cardNumber') {
      value = this.formatCardNumber(value);
    } else if (this.formatType === 'expirationDate') {
      value = this.formatExpirationDate(value);
    }

    input.value = value;
    this.ngControl?.control?.setValue(value);
  }

  private formatCardNumber(value: string): string {
    return value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
  }
  private formatExpirationDate(value: string): string {
    value = value.replace(/[^0-9]/g, '').substring(0, 4);
    if (value.length > 2) {
      value = `${value.substring(0, 2)}/${value.substring(2)}`;
    }
    return value;
  }
}
