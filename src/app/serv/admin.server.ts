import {Injectable}    from '@angular/core';
import {Rc4Server} from './rc4.server';
import Cookies from 'cookies-js';

@Injectable()
export class AdminFunc {
  public adminInfoKey = 'admin';

  constructor(private rc4Server: Rc4Server) {
  }

  public saveAdminInfo(adminInfo): void {
    Cookies.set(this.adminInfoKey, this.rc4Server.encrypt(adminInfo));
  }

  public getAdminInfo(): {} {
    let info = Cookies.get(this.adminInfoKey);
    return this.rc4Server.decrypt(info, true);
  }

  public getAdminId(): string {
    let adminInfo = this.getAdminInfo();
    console.log(adminInfo);
    return adminInfo['admin_id'];
  }
}
