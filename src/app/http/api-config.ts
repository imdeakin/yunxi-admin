/**
 * Created by Administrator on 2017/3/3.
 */
import {Injectable} from '@angular/core';

@Injectable()
export class ApiConfig {
  public server: string = 'http://120.76.248.165:9090'; // http://www.gzyueyun.com
  public root: string = this.server + '';
  public imgRoot: string = this.server + '';
  public paths = {
    getAdminInfo: this.root + '/system/adminInfo', // 获取管理员信息
    getSalesInfo: this.root + '/system/getSalesInfo', // 获取销售信息
    getYoukaTaocanList: this.root + '/oiling/packageInfoList', // 获取油卡套餐列表
    getYoukaBindList: this.root + '/oiling/oilBoundList', // 获取油卡套餐列表
    getYoukaOrderList: this.root + '/oiling/depositList', // 获取油卡购买套餐订单列表
    getYoukaRecordList: this.root + '/oiling/oilAccountList', // 获取油卡到账记录列表
  };

  public getImgFullPath(imgPath: string): string {
    return this.imgRoot + '/' + imgPath.replace(/^\//, '');
  }
}
