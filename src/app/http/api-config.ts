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

    // 商城管理
    getStoreGoodsList: this.root + '/marketManage/mallGoodsList', // 获取商品列表
    getStoreGoodsTypeList: this.root + '/brandGoodsTypeManage/mallGoodsTypemList', // 获取商品类型列表
    updateStoreGoodsTypeInfo: this.root + '/brandGoodsTypeManage/saveMallGoodsTypem', // 更新商品类型信息
    updateStoreGoodsBrandList: this.root + '/brandGoodsTypeManage/mallGoodsBrandList', // 更新商品品牌列表
    updateStoreGoodsBrandInfo: this.root + '/brandGoodsTypeManage/mallGoodsBrandList', // 更新商品品牌信息

    // 车系管理
    getCarSeriesList: this.root + '/system/getCarSeriesList', // 获取车系列表
    addCarSeries: this.root + '/system/addCarSeries', // 添加车系信息
    updateCarSeries: this.root + '/system/updateCarSeries', // 修改车系信息
    removeCarSeries: this.root + '/system/delCarSeries', // 删除车系信息

    // 车品牌管理
    getCarBrandList: this.root + '/system/CarBrandList', // 获取车品牌列表
    addCarBrand: this.root + '/system/addCarBrand', // 添加车品牌
    updateCarBrand: this.root + '/system/updateCarBrand', // 修改车品牌
    removeCarBrand: this.root + '/system/delCarBrand', // 删除车品牌

    // 车型管理
    getCarModelList: this.root + '/system/selectModelsList', // 获取车型列表
    addCarModel: this.root + '/system/addModels', // 添加车型
    updateCarModel: this.root + '/system/updateModels', // 修改车型
    removeCarModel: this.root + '/system/delModels', // 删除车型

    // 管理员
    getAdminList: this.root + '/system/user/selectAdminList', // 获取管理员列表
    addAdmin: this.root + '/system/user/addAdmin', // 添加管理员
    updateAdmin: this.root + '/system/user/updateAdmin', // 修改管理员
    removeAdmin: this.root + '/system/user/delAdmin', // 删除管理员

  };

  public getImgFullPath(imgPath: string): string {
    return this.imgRoot + '/' + imgPath.replace(/^\//, '');
  }
}
