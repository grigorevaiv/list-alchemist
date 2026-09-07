import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function trimmedStringLengthValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const length = (control.value ?? '').trim().length;
    if (length === 0) return { required: true };
    if (length < min) return { tooShort: true };
    if (length > max) return { tooLong: true };
    return null;
  };
}