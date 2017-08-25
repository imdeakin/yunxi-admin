import { FormControl, NG_VALIDATORS } from '@angular/forms';
import { Directive } from '@angular/core';

export function validateDate(c: FormControl) {
    let MOBILE_REGEXP = /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}(\s+)([0-9]{2}\:[0-9]{2}\:[0-9]{2})$/;

    return MOBILE_REGEXP.test(c.value) ? null : {
        validateDate: {valid: false}
    }
}

@Directive({
    selector: '[validateDate][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useValue: validateDate, multi: true }
    ]
})
export class DateValidator {}