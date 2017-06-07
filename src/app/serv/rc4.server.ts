/**
 * Created by Administrator on 2017/6/7.
 */
import {Injectable} from '@angular/core'
import CryptoJS from 'crypto-js';

Injectable()
export class Rc4Server {
  public key = 'YQH_2017^123456';

  public encrypt(plaintext: string): string {
    if (typeof plaintext === 'object') {
      plaintext = JSON.stringify(plaintext);
    }

    if (typeof plaintext !== 'string' || plaintext === '') {
      return '';
    }

    return CryptoJS.RC4.encrypt(plaintext, this.key);
  }

  public decrypt(ciphertext: string, toJSON?: boolean) {
    if (typeof ciphertext !== 'string' || ciphertext === '') {
      return '';
    }
    let plaintext = CryptoJS.RC4.decrypt(ciphertext, this.key).toString(CryptoJS.enc.Utf8);
    if (toJSON && plaintext) {
      plaintext = JSON.parse(plaintext);
    }
    return plaintext;
  }
}
