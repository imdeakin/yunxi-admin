import { FormControl, NG_VALIDATORS } from '@angular/forms';
import { Directive } from '@angular/core';

export function validateNumber(c: FormControl) {
    let MOBILE_REGEXP = /^[0-9]*\.?[0-9]*$/;

    return MOBILE_REGEXP.test(c.value) ? null : {
        validateNumber: {valid: false}
    }
}

@Directive({
    selector: '[validateNumber][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useValue: validateNumber, multi: true }
    ]
})
export class NumberValidator {}