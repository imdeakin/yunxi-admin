/**
 * Created by Administrator on 2017/6/7.
 */
import {Injectable} from '@angular/core'
import {Rc4Util} from './Rc4Util';

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
    return Rc4Util.encry_RC4_string(plaintext, this.key);
  }

  public decrypt(ciphertext: string, toJSON?: boolean) {
    if (typeof ciphertext !== 'string' || ciphertext === '') {
      return '';
    }
    let plaintext = Rc4Util.decry_RC4(ciphertext, this.key);
    if (toJSON && plaintext) {
      plaintext = JSON.parse(plaintext);
    }
    return plaintext;
  }
}
