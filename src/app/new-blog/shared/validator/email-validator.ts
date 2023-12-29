import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

export function conditionalEmailRequiredValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isEmailFilled = control.value && control.value.trim() !== '';
    return isEmailFilled ? Validators.required(control) : null;
  };
}
