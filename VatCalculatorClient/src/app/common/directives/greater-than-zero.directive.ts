import { Directive } from '@angular/core';
import { AbstractControl, Validator, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[greaterThanZero]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: GreaterThanZeroDirective,
    multi: true
  }]
})

export class GreaterThanZeroDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
    if (isNaN(control.value) || control.value <= 0) {
      return { 'greaterThanZero': true };
    }
    return null;
  }
}
