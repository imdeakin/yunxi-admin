/**
 * Created by Administrator on 2017/3/3.
 */
import {Injectable} from '@angular/core';

@Injectable()
export class ApiConfig {
  public server: string = 'http://39.108.61.60'; // http://www.gzyueyun.com
  public root: string = this.server + '';
  public imgRoot: string = this.server + '';
  public paths = {
    login: this.root + '/adUser/login', // 登录

    getAdminInfo: this.root + '/system/adminInfo', // 获取管理员信息
    getSalesInfo: this.root + '/system/getSalesInfo', // 获取销售信息
    // 油卡管理
    getYoukaTaocanList: this.root + '/oiling/packageInfoList', // 获取油卡套餐列表
    getYoukaBindList: this.root + '/oiling/oilBoundList', // 获取油卡套餐列表
    getYoukaOrderList: this.root + '/oiling/depositList', // 获取油卡购买套餐订单列表
    getYoukaRecordList: this.root + '/oiling/oilAccountList', // 获取油卡到账记录列表
    // 会员管理
    getUserList: this.root + '/members/memberInfoList', // 获取会员列表
    getLevelRecordList: this.root + '/members/memberUpgradeList', // 获取会员升级记录列表
    getLevelOrderList: this.root + '/members/memberUpgradeOrder', // 获取会员升级订单列表
    getRelationList: this.root + '/members/getRelationInfo', // 获取推介关系列表
    // 合伙人管理
    getPartnerList: this.root + '/copartner/selectPartnerList', // 获取合伙人列表
    getPartnerApplyList: this.root + '/copartner/applyPartnerList', // 获取合伙人申请列表
  };

  public getImgFullPath(imgPath: string): string {
    return this.imgRoot + '/' + imgPath.replace(/^\//, '');
  }
}
