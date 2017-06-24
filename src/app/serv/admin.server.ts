import {Injectable}    from '@angular/core';
import {Rc4Server} from './rc4.server';
import Cookies from 'cookies-js';

@Injectable()
export class AdminFunc {
  constructor(private rc4server: Rc4Server) {
  }

  public getAdminInfo(): {} {
    let cKey = 'admin';
    let cStr = Cookies.get(cKey);
    return this.rc4server.decrypt(cStr, true);
  }

  public getAdminId(): string {
    let adminInfo = this.getAdminInfo();
    return adminInfo['id']
  }
}
