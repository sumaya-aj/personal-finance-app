import { AbstractControl, ValidationErrors } from '@angular/forms';

export function numberAndGreaterThanZeroValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (isNaN(value) || value <= 0) {
        return { notGreaterThanZero: true };
    }
    return null;
}