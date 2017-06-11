/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Injectable} from '@angular/core';
import {ApiRequest, ApiConfig, ReqOpts} from './index';

@Injectable()
export class ApiCall {
  constructor(private apiRequest: ApiRequest, private apiConfig: ApiConfig) {
  }

  public apiCall(options): void {
    let url = options.url;
    let data = options.data;
    let success = options.success;
    let failure = options.failure;
    let opts: ReqOpts = {
      url: url,
      data: data,
      success: (data, total) => {
        success(data, total);
      },
      failure: (code, msg) => {
        console.error('Call api error: ' + url);
        console.error('Call api error ==> code: ' + code + ', msg: ' + msg);
        if (failure) {
          failure(code, msg);
        }
      }
    };
    this.apiRequest.post(opts);
  }

  public login(loginName, passWord, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.login,
      data: {
        loginName: loginName,
        passWord: passWord
      },
      success: success,
      failure: failure
    });
  }

  public getAdminInfo(admindId, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getAdminInfo,
      data: {
        adminId: admindId
      },
      success: success,
      failure: failure
    });
  }

  public getSalesInfo(admindId, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getSalesInfo,
      data: {
        adminId: admindId
      },
      success: success,
      failure: failure
    });
  }

  public getYoukaTaocanList(curPageIndex: number, pageSize: number, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getYoukaTaocanList,
      data: {
        index: curPageIndex,
        pageSize: pageSize
      },
      success: success,
      failure: failure
    });
  }

  public getYoukaBindList(oilCard: string, curPageIndex: number, pageSize: number, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getYoukaBindList,
      data: {
        index: curPageIndex,
        pageSize: pageSize,
        oilCard: oilCard
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 获取油卡购买套餐订单列表
   * @param oilCard 油卡号码
   * @param tradeMode 交易方式：1、支付宝，2、微信，3、云付通，4，余额
   * @param classify 分类：1、默认套餐，2、优惠活动，3、会员专享
   * @param curPageIndex
   * @param pageSize
   * @param success
   * @param failure
   */
  public getYoukaOrderList(oilCard, tradeMode, classify, curPageIndex: number, pageSize: number, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getYoukaOrderList,
      data: {
        index: curPageIndex,
        pageSize: pageSize,
        oilCard: oilCard,
        tradeMode: tradeMode,
        classify: classify
      },
      success: success,
      failure: failure
    });
  }

  public getYoukaRecordList(oilCard, curPageIndex: number, pageSize: number, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getYoukaRecordList,
      data: {
        index: curPageIndex,
        pageSize: pageSize,
        oilCard: oilCard
      },
      success: success,
      failure: failure
    });
  }

  public getUserList(mobile, level, regionId, curPageIndex: number, pageSize: number, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getUserList,
      data: {
        index: curPageIndex,
        pageSize: pageSize,
        mobile: mobile,
        level: level,
        regionId: regionId,
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 获取会员升级记录列表
   * @param mobile 会员号(用户的手机号)
   * @param memberLevelId 会员等级ID
   * @param regionId 地区id
   * @param curPageIndex
   * @param pageSize
   * @param success
   * @param failure
   */
  public getLevelRecordList(mobile, memberLevelId, regionId, curPageIndex: number, pageSize: number, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getLevelRecordList,
      data: {
        index: curPageIndex,
        pageSize: pageSize,
        mobile: mobile,
        memberLevelId: memberLevelId,
        regionId: regionId,
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 获取会员升级订单列表
   * @param mobile 会员号(用户的手机号)
   * @param memberLevelId 会员等级ID
   * @param status 状态：0、待支付，1、成功，-1、失败 ，-2、取消升级
   * @param curPageIndex
   * @param pageSize
   * @param success
   * @param failure
   */
  public getLevelOrderList(mobile, memberLevelId, status, curPageIndex: number, pageSize: number, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getLevelOrderList,
      data: {
        index: curPageIndex,
        pageSize: pageSize,
        mobile: mobile,
        memberLevelId: memberLevelId,
        status: status,
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 推荐关系列表
   * @param mobile 会员账号（用户表手机）
   * @param curPageIndex
   * @param pageSize
   * @param success
   * @param failure
   */
  public getRelationList(mobile, curPageIndex: number, pageSize: number, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getRelationList,
      data: {
        index: curPageIndex,
        pageSize: pageSize,
        mobile: mobile,
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 获取合伙人列表
   * @param sn 合伙人编号
   * @param partnerLevelId 合伙人等级
   * @param regionId 地区ID
   * @param effectTime 生效日期
   * @param curPageIndex
   * @param pageSize
   * @param success
   * @param failure
   */
  public getPartnerList(sn, partnerLevelId, regionId, effectTime, curPageIndex: number, pageSize: number, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getPartnerList,
      data: {
        index: curPageIndex,
        pageSize: pageSize,
        sn: sn,
        partnerLevelId: partnerLevelId,
        regionId: regionId,
        effectTime: effectTime,
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 获取合伙人申请列表
   * @param mobile 手机号
   * @param createTime 申请时间
   * @param partnerLevelId 合伙人级别ID
   * @param regionId 地区id
   * @param status 0待审核,1通过
   * @param curPageIndex
   * @param pageSize
   * @param success
   * @param failure
   */
  public getPartnerApplyList(mobile, createTime, partnerLevelId, regionId, status, curPageIndex: number, pageSize: number, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getPartnerApplyList,
      data: {
        index: curPageIndex,
        pageSize: pageSize,
        mobile: mobile,
        createTime: createTime,
        partnerLevelId: partnerLevelId,
        regionId: regionId,
        status: status,
      },
      success: success,
      failure: failure
    });
  }

  public getStoreGoodsTypeList(curPageIndex: number, pageSize: number, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getStoreGoodsTypeList,
      data: {
        index: curPageIndex,
        pageSize: pageSize
      },
      success: success,
      failure: failure
    });
  }

  public updateStoreGoodsTypeInfo(typeName: string, status: number, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.updateStoreGoodsTypeInfo,
      data: {
        typeName: typeName,
        status: status
      },
      success: success,
      failure: failure
    });
  }

  public getCarSeriesList(series: string, curPageIndex: number, pageSize: number, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getCarSeriesList,
      data: {
        index: curPageIndex,
        pageSize: pageSize,
        series: series
      },
      success: success,
      failure: failure
    });
  }

  public addCarSeries(series: string, carBrandId: string,success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.addCarSeries,
      data: {
        series: series,
        carBrandId: carBrandId
      },
      success: success,
      failure: failure
    });
  }

  public updateCarSeries(carseriesId: string, series: string, carBrandId: string,success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.updateCarSeries,
      data: {
        carseriesId: carseriesId,
        series: series,
        carBrandId: carBrandId
      },
      success: success,
      failure: failure
    });
  }

  public removeCarSeries(carseriesId: string, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.removeCarSeries,
      data: {
        carseriesId: carseriesId
      },
      success: success,
      failure: failure
    });
  }

  public getCarBrandList(brand, curPageIndex, pageSize, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getCarBrandList,
      data: {
        index: curPageIndex,
        pageSize: pageSize,
        brand: brand
      },
      success: success,
      failure: failure
    });
  }

  public addCarBrand(brand: string, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.addCarBrand,
      data: {
        brand: brand,
      },
      success: success,
      failure: failure
    });
  }

  public updateCarBrand(carBrandId: string, brand: string,success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.updateCarBrand,
      data: {
        carBrandId: carBrandId,
        brand: brand
      },
      success: success,
      failure: failure
    });
  }

  public removeCarBrand(carBrandId: string, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.removeCarBrand,
      data: {
        carBrandId: carBrandId
      },
      success: success,
      failure: failure
    });
  }

  public getCarModelList(model, curPageIndex, pageSize, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getCarModelList,
      data: {
        index: curPageIndex,
        pageSize: pageSize,
        models: model
      },
      success: success,
      failure: failure
    });
  }

  public addCarModel(model: string, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.addCarModel,
      data: {
        models: model,
      },
      success: success,
      failure: failure
    });
  }

  public updateCarModel(carModelId: string, model: string,success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.updateCarModel,
      data: {
        carModelId: carModelId,
        models: model
      },
      success: success,
      failure: failure
    });
  }

  public removeCarModel(carModelId: string, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.removeCarModel,
      data: {
        carModelsId: carModelId
      },
      success: success,
      failure: failure
    });
  }

  public getAdminList(roleName, curPageIndex, pageSize, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getAdminList,
      data: {
        index: curPageIndex,
        pageSize: pageSize,
        name: roleName
      },
      success: success,
      failure: failure
    });
  }

  public addAdmin(admin: string, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.addAdmin,
      data: {
        admin: admin,
      },
      success: success,
      failure: failure
    });
  }

  public updateAdmin(adminId: string, admin: string,success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.updateAdmin,
      data: {
        adminId: adminId,
        admin: admin
      },
      success: success,
      failure: failure
    });
  }

  public removeAdmin(adminId: string, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.removeAdmin,
      data: {
        adminId: adminId
      },
      success: success,
      failure: failure
    });
  }
}
