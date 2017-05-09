/**
 * Created by Deakin on 2017/5/9 0009.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class ElClass {
    public hasClass(el, className: string): boolean {
        let classList = el.className.split(/\s+/);
        let result = false;
        for (let i = 0, len = classList.length; i < len; i++) {
            if (classList[i] === className) {
                result = true;
                break;
            }
        }
        return result;
    }

    public removeClass(el, className: string): string {
        let classList = el.className.split(/\s+/);

        let classNames = '';
        for (let i = 0, len = classList.length; i < len; i++) {
            if (classList[i] !== className) {
                classNames += (classNames ? ' ' : '') + classList[i];
            }
        }

        el.className = classNames;
        return classNames;
    }

    public addClass(el, className: string): string {
        let classList = el.className.split(/\s+/);
        let classList1 = className.split(/\s+/);
        let classList2 = classList1;

        let classNames = el.className;
        for (let i = 0, len = classList.length; i < len; i++) {

            for (let ii = 0, len1 = classList1.length; ii < len1; ii++) {
                if (classList[i] === classList1[ii]) {
                    classList2.splice(ii, 1);
                }
            }
        }

        for (let i = 0, len = classList2.length; i < len; i++) {
            classNames += (classNames ? ' ' : '') + classList2[i];
        }

        el.className = classNames;
        return classNames;
    }
}
