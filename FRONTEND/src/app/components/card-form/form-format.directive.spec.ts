import { FormFormatDirective } from './form-format.directive';
import { NgControl } from '@angular/forms';

describe('FormFormatDirective', () => {
  it('should create an instance', () => {
    const ngControl = { control: null } as NgControl;
    const directive = new FormFormatDirective(ngControl);
    expect(directive).toBeTruthy();
  });
});
