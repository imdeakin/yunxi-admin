import {Injectable} from '@angular/core'
import { Rc4Server } from '../../../../yunxi-admin/src/app/serv/rc4.server';
import Cookies from 'cookies-js';


export class AdminInfo {

    public static getAdminInfo(rc4server:Rc4Server):string{
        let adminInfo = 'admin';
        adminInfo = Cookies.get(adminInfo);
        adminInfo = rc4server.decrypt(adminInfo)
        return adminInfo;
    }
}