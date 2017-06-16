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
    console.log(options);
    let url = options.url;
    let data = options.data;
    let success = options.success;
    let failure = options.failure;
    let opts: ReqOpts = <ReqOpts>{
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
  
  //编辑油卡套餐
  public updateYoukaTaocanList(oilPackageId: string, classify: string, payMoney:number, amount: number, eachs: number, type: number,oilCardType:number,needPoints:number,described:string, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.updateYoukaTaocanList,
      data: {
        oilPackageId:oilPackageId,
        classify:classify,
        payMoney:payMoney,
        amount:amount,
        eachs:eachs,
        type:type,
        oilCardType:oilCardType,
        needPoints:needPoints,
        described:described
      },
      success: success,
      failure: failure
    });
  }

  //增加油卡套餐
  public addYoukaTaocanList(classify: string,payMoney:number,amount:number,eachs:number,type:number,oilCardType:number,needPoints:number,described:string, success, failure?):void{
     this.apiCall({
        url:this.apiConfig.paths.addYoukaTaocanList,
        data:{
          classify:classify,
          payMoney:payMoney,
          amount:amount,
          eachs:eachs,
          type:type,
          oilCardType:oilCardType,
          needPoints:needPoints,
          described:described
        },
        success:success,
        failure:failure
     });
  }

  //删除油卡套餐
   public deleteYoukaTaocanList(oilPackageId:string, success, failure?):void{
     console.log(oilPackageId)
     this.apiCall({
        url:this.apiConfig.paths.removeYoukaTaocanList,
        data:{
          oilPackageId:oilPackageId
        },
        success:success,
        failure:failure
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

  public getInsuranceOrderList(searchName, curPageIndex: number, pageSize: number, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getInsuranceOrderList,
      data: {
        index: curPageIndex,
        pageSize: pageSize,
        searchName: searchName
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

  public getUserInfo(memberId, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getUserInfo,
      data: {
        memberId: memberId
      },
      success: success,
      failure: failure
    });
  }
  /** 
   *获取可办理违章列表和不可办理违章了列表
   * @param searchName (姓名/手机号/订单编号)
   * @param type 类型1可办理2不可办理
   * @param index 当前页
   * @param pageSize 每页显示多少条 
  */

   public getCanWeiZhangList(type:string,index:number,pageSize:number, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getCanWeizhangList,
      data: {
        type:type,
        index:index,
        pageSize:pageSize
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

  public getPartnerInfo(partnerId, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getPartnerInfo,
      data: {
        partnerId: partnerId
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

  public getPartnerApplyInfo(partnerApplyId, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getPartnerApplyInfo,
      data: {
        partnerApplyId: partnerApplyId
      },
      success: success,
      failure: failure
    });
  }

  /*
   * 商城管理
   */

  public getStoreGoodsList(sn, businessName, onSale, curPageIndex: number, pageSize: number, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getStoreGoodsList,
      data: {
        index: curPageIndex,
        pageSize: pageSize,
        sn: sn,
        businessName: businessName,
        onSale: onSale
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 添加商品
   * @param goodsTypeId 商品类型ID
   * @param goodsBrandId 品牌ID
   * @param businessName 商品名称
   * @param producer 产地
   * @param described 商品描述
   * @param freight 运费
   * @param seeCount 浏览数量
   * @param onSale 是否上架：0 否 1是
   * @param skuJson skuJson
   * @param attrJson attrJson
   * @param picJson picJson
   * @param success
   * @param failure
   */
  public addStoreGoods(goodsTypeId, goodsBrandId, businessName, producer, described, freight, seeCount, onSale, skuJson, attrJson, picJson, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.addStoreGoods,
      data: {
        goodsTypeId: goodsTypeId,
        goodsBrandId: goodsBrandId,
        businessName: businessName,
        producer: producer,
        described: described,
        freight: freight,
        seeCount: seeCount,
        onSale: onSale,
        skuJson: skuJson,
        attrJson: attrJson,
        picJson: picJson,
      },
      success: success,
      failure: failure
    });
  }

  public updateStoreGoods(regionId: string, title: string, msgType, userStoreGoodsId: string, content: string, remark: string, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.updateStoreGoods,
      data: {
        regionId: regionId,
        title: title,
        msgType: msgType,
        userStoreGoodsId: userStoreGoodsId,
        content: content,
        remark: remark
      },
      success: success,
      failure: failure
    });
  }

  public removeStoreGoods(userStoreGoodsId: string, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.removeStoreGoods,
      data: {
        userStoreGoodsId: userStoreGoodsId
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

  public addStoreGoodsTypeInfo(pGoodsTypeId, typeName, level, currChildSort, sort, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.addStoreGoodsTypeInfo,
      data: {
        pGoodsTypeId: pGoodsTypeId,
        typeName: typeName,
        level: level,
        currChildSort: currChildSort,
        sort: sort
      },
      success: success,
      failure: failure
    });
  }

  public updateStoreGoodsTypeInfo(goodsTypeId, pGoodsTypeId, typeName, level, currChildSort, sort, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.updateStoreGoodsTypeInfo,
      data: {
        goodsTypeId: goodsTypeId,
        pGoodsTypeId: pGoodsTypeId,
        typeName: typeName,
        level: level,
        currChildSort: currChildSort,
        sort: sort
      },
      success: success,
      failure: failure
    });
  }

  public removeStoreGoodsTypeInfo(goodsTypeId: string, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.removeStoreGoodsTypeInfo,
      data: {
        goodsTypeId: goodsTypeId
      },
      success: success,
      failure: failure
    });
  }

  public getStoreOrderList(sn, status, curPageIndex: number, pageSize: number, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getStoreOrderList,
      data: {
        index: curPageIndex,
        pageSize: pageSize,
        sn: sn,
        status: status
      },
      success: success,
      failure: failure
    });
  }

  public updateStoreOrder(orderId, actualPrice, contact, mobile, address, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.updateStoreOrder,
      data: {
        orderId: orderId,
        actualPrice: actualPrice,
        contact: contact,
        mobile: mobile,
        address: address
      },
      success: success,
      failure: failure
    });
  }

  public signStoreOrder(orderId, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.signStoreOrder,
      data: {
        orderId: orderId
      },
      success: success,
      failure: failure
    });
  }

  public updateStoreOrderExpress(orderDetailsIds, expressId, waybillNumber, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.updateStoreOrderExpress,
      data: {
        orderDetailsIds: orderDetailsIds,
        expressId: expressId,
        waybillNumber: waybillNumber
      },
      success: success,
      failure: failure
    });
  }

  public getStoreExpressList(orderDetailsIds, expressId, waybillNumber, curPageIndex: number, pageSize: number, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getStoreExpressList,
      data: {
        index: curPageIndex,
        pageSize: pageSize,
        orderDetailsIds: orderDetailsIds,
        expressId: expressId,
        waybillNumber: waybillNumber
      },
      success: success,
      failure: failure
    });
  }

  public getCloudpayVerificationList(type, sn, curPageIndex: number, pageSize: number, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getCloudpayVerificationList,
      data: {
        index: curPageIndex,
        pageSize: pageSize,
        type: type,
        sn: sn
      },
      success: success,
      failure: failure
    });
  }

  public updatecloudpayVerification(adminId, sn, type, status, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.updateCloudpayVerification,
      data: {
        adminId: adminId,
        sn: sn,
        type: type,
        status: status
      },
      success: success,
      failure: failure
    });
  }

  public getMsgList(regionId: string, title: string, msgType: string, curPageIndex: number, pageSize: number, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getMsgList,
      data: {
        index: curPageIndex,
        pageSize: pageSize,
        regionId: regionId,
        title: title,
        msgType: msgType
      },
      success: success,
      failure: failure
    });
  }

  public addMsg(regionId, title, msgType, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.addMsg,
      data: {
        regionId: regionId,
        title: title,
        msgType: msgType,
      },
      success: success,
      failure: failure
    });
  }

  public updateMsg(regionId: string, title: string, msgType, userMsgId: string, content: string, remark: string, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.updateMsg,
      data: {
        regionId: regionId,
        title: title,
        msgType: msgType,
        userMsgId: userMsgId,
        content: content,
        remark: remark
      },
      success: success,
      failure: failure
    });
  }

  public removeMsg(userMsgId: string, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.removeMsg,
      data: {
        userMsgId: userMsgId
      },
      success: success,
      failure: failure
    });
  }

  public getFeedbackList(mobile: string, curPageIndex: number, pageSize: number, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getFeedbackList,
      data: {
        index: curPageIndex,
        pageSize: pageSize,
        mobile: mobile
      },
      success: success,
      failure: failure
    });
  }

  public getFeedbackInfo(feedbackId: string, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getFeedbackInfo,
      data: {
        feedbackId: feedbackId
      },
      success: success,
      failure: failure
    });
  }

  public removeFeedback(feedbackId: string, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.removeFeedback,
      data: {
        feedbackId: feedbackId
      },
      success: success,
      failure: failure
    });
  }

  public getAdList(positionCode, businessId, title, curPageIndex: number, pageSize: number, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getAdList,
      data: {
        index: curPageIndex,
        pageSize: pageSize,
        positionCode: positionCode,
        businessId: businessId,
        title: title,
      },
      success: success,
      failure: failure
    });
  }

  public addAd(title, fileId, businessId, isShow, positionCode, sort, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.addAd,
      data: {
        title: title,
        fileId: fileId,
        businessId: businessId,
        isShow: isShow,
        positionCode: positionCode,
        sort: sort
      },
      success: success,
      failure: failure
    });
  }

  public updateAd(adId, title, fileId, businessId, isShow, positionCode, sort, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.updateAd,
      data: {
        adId: adId,
        title: title,
        fileId: fileId,
        businessId: businessId,
        isShow: isShow,
        positionCode: positionCode,
        sort: sort
      },
      success: success,
      failure: failure
    });
  }

  public removeAd(adId: string, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.removeAd,
      data: {
        adId: adId
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

  public addCarSeries(series: string, carBrandId: string, success, failure?): void {
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

  public updateCarSeries(carseriesId: string, series: string, carBrandId: string, success, failure?): void {
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

  public updateCarBrand(carBrandId: string, brand: string, success, failure?): void {
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

  public updateCarModel(carModelId: string, model: string, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.updateCarModel,
      data: {
        carModelsId: carModelId,
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

  public addAdmin(roleId: string, adminName: string, pwd: string, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.addAdmin,
      data: {
        roleId: roleId,
        name: adminName,
        pwd: pwd
      },
      success: success,
      failure: failure
    });
  }

  public updateAdmin(adminId: string, admin: string, success, failure?): void {
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

  public getRoleList(roleName, curPageIndex, pageSize, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getRoleList,
      data: {
        index: curPageIndex,
        pageSize: pageSize,
        name: roleName
      },
      success: success,
      failure: failure
    });
  }

  public addRole(roleName: string, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.addRole,
      data: {
        name: roleName,
      },
      success: success,
      failure: failure
    });
  }

  public updateRole(roleId: string, roleName: string, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.updateRole,
      data: {
        roleId: roleId,
        role: roleName
      },
      success: success,
      failure: failure
    });
  }

  public removeRole(roleId: string, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.removeRole,
      data: {
        roleId: roleId
      },
      success: success,
      failure: failure
    });
  }
}
