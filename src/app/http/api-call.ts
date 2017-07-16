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
    let success = options.success;
    let failure = options.failure;
    options.success = (data, total) => {
      success(data, total);
    };
    options.failure = (code, msg) => {
      console.error('Call api error: ' + url);
      console.error('Call api error ==> code: ' + code + ', msg: ' + msg);
      if (failure) {
        failure(code, msg);
      }
    };
    this.apiRequest.post(options);
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
  public updateYoukaTaocanList(oilPackageId: string, classify: string, payMoney: number, amount: number, eachs: number, type: number, oilCardType: number, needPoints: number, described: string, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.updateYoukaTaocanList,
      data: {
        oilPackageId: oilPackageId,
        classify: classify,
        payMoney: payMoney,
        amount: amount,
        eachs: eachs,
        type: type,
        oilCardType: oilCardType,
        needPoints: needPoints,
        described: described
      },
      success: success,
      failure: failure
    });
  }

  //增加油卡套餐
  public addYoukaTaocanList(classify: string, payMoney: number, amount: number, eachs: number, type: number, oilCardType: number, needPoints: number, described: string, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.addYoukaTaocanList,
      data: {
        classify: classify,
        payMoney: payMoney,
        amount: amount,
        eachs: eachs,
        type: type,
        oilCardType: oilCardType,
        needPoints: needPoints,
        described: described
      },
      success: success,
      failure: failure
    });
  }

  //删除油卡套餐
  public deleteYoukaTaocanList(oilPackageId: string, success, failure?): void {
    console.log(oilPackageId)
    this.apiCall({
      url: this.apiConfig.paths.removeYoukaTaocanList,
      data: {
        oilPackageId: oilPackageId
      },
      success: success,
      failure: failure
    });
  }

  public getYoukaBindList(oilCard: string, mobile: string, userName: string, curPageIndex: number, pageSize: number, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getYoukaBindList,
      data: {
        oilCard: oilCard,
        mobile: mobile,
        userName: userName,
        index: curPageIndex,
        pageSize: pageSize,
      },
      success: success,
      failure: failure
    });
  }

  //修改油卡绑定列表
  public updateOilBound(oilCardId: string, oilCard: string, type: number, name: string, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.updateOilBound,
      data: {
        oilCardId: oilCardId,
        oilCard: oilCard,
        type: type,
        name: name
      },
      success: success,
      failure: failure
    });
  }

  //删除油卡绑定列表
  public delOilBound(oilCardId: string, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.delOilBound,
      data: {
        oilCardId: oilCardId
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 获取油卡购买套餐订单列表
   * @param sn 订单流水号
   * @param oilCard 油卡号码
   * @param tradeMode 交易方式：1、支付宝，2、微信，3、云付通，4，余额
   * @param oilPackageId 套餐id
   * @param status
   * @param curPageIndex
   * @param pageSize
   * @param success
   * @param failure
   */
  public getYoukaOrderList(sn, oilCard, tradeMode, oilPackageId, status, classify, curPageIndex: number, perPageSize: number, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getYoukaOrderList,
      data: {
        sn: sn,
        oilCard: oilCard,
        tradeMode: tradeMode,
        status: status,
        classify: classify,
        index: curPageIndex,
        pageSize: perPageSize
      },
      success: success,
      failure: failure
    });
  }

  public getYoukaRecordList(oilCard, sn, curPageIndex: number, pageSize: number, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getYoukaRecordManageList,
      data: {
        index: curPageIndex,
        pageSize: pageSize,
      },
      success: success,
      failure: failure
    });
  }

  //油卡返还
  public YouCardOrderReturn(chargeOrderId: string, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.YouCardOrderReturn,
      data: {
        chargeOrderId: chargeOrderId,
      },
      success: success,
      failure: failure
    })
  }

  public getYoucardOrderReturnList(oilCard: string, sn: string, curPageIndex: number, pageSize: number, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getYoucardOrderReturnList,
      data: {
        oilCard: oilCard,
        sn: sn,
        index: curPageIndex,
        pageSize: pageSize,
      },
      success: success,
      failure: failure
    });
  }

  //油卡订单详情
  public getCardOrderReturn(orderReturnId: string, success, failure?) {
    this.apiCall({
      url: this.apiConfig.paths.getCardOrderReturn,
      data: {
        orderReturnId: orderReturnId
      },
      success: success,
      failure: failure
    })
  }

  public getInsuranceOrderList(searchName, regionId, curPageIndex: number, pageSize: number, success, failure?): void {
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

  public getCanWeiZhangList(searchName: string, type: string, index: number, pageSize: number, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getCanWeizhangList,
      data: {
        searchName: searchName,
        type: type,
        index: index,
        pageSize: pageSize
      },
      success: success,
      failure: failure
    });
  }

  public getCantWeiZhangList(searchName: string, type: string, index: number, pageSize: number, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getCanWeizhangList,
      data: {
        searchName: searchName,
        type: type,
        index: index,
        pageSize: pageSize
      },
      success: success,
      failure: failure
    });
  }


  public getCanWeiZhangData(orderId: string, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getCanWeizhangData,
      data: {
        orderId: orderId
      },
      success: success,
      failure: failure
    })
  }

  //发送短信验证码
  public postPeccancyMsg(carNumber: number, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.postPeccancyMsg,
      data: {
        carNumber: carNumber
      },
      success: success,
      failure: failure
    })
  }

  //保存订单信息
  public postPeccancyManage(orderId: string, orderConfig, success, failure?): void {
    // console.log(orderConfig)
    this.apiCall({
      url: this.apiConfig.paths.postPeccancyManage,
      data: {
        orderId: orderId,
        orderConfig: orderConfig
      },
      success: success,
      failure: failure
    })
  }

  public comfirmCxyPayOrder(orderId: string, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.comfirmCxyPayOrder,
      data: {
        orderId: orderId
      },
      success: success,
      failure: failure
    })
  }

  public setOrderMoneyAndServiceFee(orderId: string, punishMoney: number, serviceFee: number, success, failure?): void {
    console.log(orderId, punishMoney, serviceFee)
    this.apiCall({
      url: this.apiConfig.paths.setOrderMoneyAndServiceFee,
      data: {
        orderId: orderId,
        punishMoney: punishMoney,
        serviceFee: serviceFee
      },
      success: success,
      failure: failure
    })
  }

  public comfirmOrderOfDoing(orderId: string, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.comfirmOrderOfDoing,
      data: {
        orderId: orderId
      },
      success: success,
      failure: failure
    })
  }

  public comfirmOrderOfFinish(orderId: string, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.comfirmOrderOfFinish,
      data: {
        orderId: orderId
      },
      success: success,
      failure: failure
    })
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

  //修改会员等级列表
  public updateMemberInfo(memberId: string, idcard: string, birthDay: string, pwd: string, regionId, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.updateMemberInfo,
      data: {
        memberId: memberId,
        idcard: idcard,
        birthDay: birthDay,
        pwd: pwd,
        regionId: regionId
      },
      success: success,
      failure: failure
    })
  }

  //会员统计表
  public getStatisticsData(userId: string, type: string, years: string, months: string, success, failure?) {
    this.apiCall({
      url: this.apiConfig.paths.getStatisticsData,
      data: {
        userId: userId,
        type: type,
        years: years,
        months: months,
      },
      success: success,
      failure: failure
    })

  }

  //我的会员列表
  public  getMyMemberList(memberId, level, memberLevel, curPageindex, perPageSize, success, failure?) {
    this.apiCall({
      url: this.apiConfig.paths.getMyMemberList,
      data: {
        memberId: memberId,
        level: level,
        memberLevel: memberLevel,
        index: curPageindex,
        pageSize: perPageSize
      },
      success: success,
      failure: failure
    })
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

  //审批
  public getAuditPass(partnerApplyId: string, adminId: string, agreementCode: string, approve: string, summary: string, remark: string, status: number, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getAuditPass,
      data: {
        partnerApplyId: partnerApplyId,
        adminId: adminId,
        agreementCode: agreementCode,
        approve: approve,
        summary: summary,
        remark: remark,
        status: status
      },
      success: success,
      failure: failure
    });
  }

  //复核
  public getReexamine(partnerApplyId: string, adminId: string, review: string, status: number, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getReexamine,
      data: {
        partnerApplyId: partnerApplyId,
        adminId: adminId,
        review: review,
        status: status
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

  public removeStoreGoods(goodsId: string, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.removeStoreGoods,
      data: {
        goodsId: goodsId
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 获取商品信息
   * @param sn 商品编号
   * @param success
   * @param failure
   */
  public getStoreGoodsInfo(sn, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getStoreGoodsInfo,
      data: {
        sn: sn
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 添加商品信息
   * @param goodsTypeId 商品类型ID
   * @param goodsBrandId 商品品牌ID
   * @param businessName 商品名称
   * @param producer 产地
   * @param described 商品描述
   * @param freight 运费
   * @param seeCount 浏览数量
   * @param onSale 是否上架：0 否 1是
   * @param salesVolume 总销量
   * @param success
   * @param failure
   */
  public addStoreGoodsInfo(goodsId, goodsTypeId, goodsBrandId, businessName, producer, described, freight, onSale, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.addStoreGoodsInfo,
      data: {
        goodsId: goodsId,
        goodsTypeId: goodsTypeId,
        goodsBrandId: goodsBrandId,
        businessName: businessName,
        producer: producer,
        described: described,
        freight: freight,
        onSale: onSale
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 修改商品信息
   * @param goodsId 商品ID
   * @param goodsTypeId 商品类型ID
   * @param goodsBrandId 商品品牌ID
   * @param businessName 商品名称
   * @param producer 产地
   * @param described 商品描述
   * @param freight 运费
   * @param seeCount 浏览数量
   * @param onSale 是否上架：0 否 1是
   * @param salesVolume 总销量
   * @param success
   * @param failure
   */
  public updateStoreGoodsInfo(goodsId, goodsTypeId, goodsBrandId, businessName, producer, described, freight, seeCount, onSale, salesVolume, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.updateStoreGoodsInfo,
      data: {
        goodsId: goodsId,
        goodsTypeId: goodsTypeId,
        goodsBrandId: goodsBrandId,
        businessName: businessName,
        producer: producer,
        described: described,
        freight: freight,
        seeCount: seeCount,
        onSale: onSale,
        salesVolume: salesVolume,
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 修改商品详情
   * @param goodsId 商品ID
   * @param instruction 商品详情
   * @param success
   * @param failure
   */
  public updateStoreGoodsDetail(goodsId, instruction, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.updateStoreGoodsDetail,
      data: {
        goodsId: goodsId,
        instruction: instruction
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 获取商品类型列表
   * @param curPageIndex
   * @param pageSize
   * @param success
   * @param failure
   */
  public getStoreGoodsTypeList(curPageIndex, pageSize, success, failure?): void {
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

  /**
   * 添加商品类型
   * @param pGoodsTypeId 商品分类父节点（null为顶级分类）
   * @param typeName 商品类型名称
   * @param level 级别
   * @param currChildSort 子节点当前的排序号（无子节点为null）
   * @param sort 排序
   * @param success
   * @param failure
   */
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

  /**
   * 修改商品类型
   * @param goodsTypeId 商品类型ID
   * @param pGoodsTypeId 商品分类父节点（null为顶级分类）
   * @param typeName 商品类型名称
   * @param level 级别
   * @param currChildSort 子节点当前的排序号（无子节点为null）
   * @param sort 排序
   * @param success
   * @param failure
   */
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

  /**
   * 删除商品类型
   * @param goodsTypeId 商品类型ID
   * @param success
   * @param failure
   */
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

  /**
   * 获取商品类型参数列表
   * @param goodsTypeId 类型Id
   * @param isSku 是否销售 0 否 1 是
   * @param success
   * @param failure
   */
  public getStoreGoodsTypeAttrList(goodsTypeId, isSku, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getStoreGoodsTypeAttrList,
      data: {
        goodsTypeId: goodsTypeId,
        isSku: isSku
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 添加商品类型参数
   * @param goodsTypeId 类型Id
   * @param name 参数名称
   * @param isSku 是否销售  0 否 1 是
   * @param sort 排序
   * @param success
   * @param failure
   */
  public addStoreGoodsTypeAttr(goodsTypeId, name, isSku, sort, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.addStoreGoodsTypeAttr,
      data: {
        goodsTypeId: goodsTypeId,
        name: name,
        isSku: isSku,
        sort: sort
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 修改商品类型参数
   * @param paramId 参数Id
   * @param goodsTypeId 类型Id
   * @param name 参数名称
   * @param isSku 是否销售  0 否 1 是
   * @param sort 排序
   * @param success
   * @param failure
   */
  public updateStoreGoodsTypeAttr(paramId, goodsTypeId, name, isSku, sort, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.updateStoreGoodsTypeAttr,
      data: {
        paramId: paramId,
        goodsTypeId: goodsTypeId,
        name: name,
        isSku: isSku,
        sort: sort
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 删除商品类型参数
   * @param paramId 商品类型参数ID
   * @param success
   * @param failure
   */
  public removeStoreGoodsTypeAttr(paramId: string, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.removeStoreGoodsTypeAttr,
      data: {
        paramId: paramId
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 获取商品类型参数值列表
   * @param goodsTypeId 商品类型ID
   * @param paramId 类型ID
   * @param success
   * @param failure
   */
  public getStoreGoodsTypeAttrValList(goodsTypeId, paramId, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getStoreGoodsTypeAttrValList,
      data: {
        goodsTypeId: goodsTypeId,
        paramId: paramId
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 添加商品类型参数值
   * @param paramId 参数Id
   * @param goodsTypeId 类型Id
   * @param value 值内容
   * @param sort 排序
   * @param success
   * @param failure
   */
  public addStoreGoodsTypeAttrVal(paramId, goodsTypeId, value, sort, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.addStoreGoodsTypeAttrVal,
      data: {
        paramId: paramId,
        goodsTypeId: goodsTypeId,
        value: value,
        sort: sort
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 修改商品类型参数值
   * @param valueId 参数值Id
   * @param paramId 参数Id
   * @param goodsTypeId 类型Id
   * @param value 值内容
   * @param sort 排序
   * @param success
   * @param failure
   */
  public updateStoreGoodsTypeAttrVal(valueId, paramId, goodsTypeId, value, sort, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.updateStoreGoodsTypeAttrVal,
      data: {
        valueId: valueId,
        paramId: paramId,
        goodsTypeId: goodsTypeId,
        value: value,
        sort: sort
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 删除商品类型参数值
   * @param valueId 商品类型参数值ID
   * @param success
   * @param failure
   */
  public removeStoreGoodsTypeAttrVal(valueId: string, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.removeStoreGoodsTypeAttrVal,
      data: {
        valueId: valueId
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 获取商品品牌列表
   * @param curPageIndex
   * @param pageSize
   * @param success
   * @param failure
   */
  public getStoreGoodsBrandList(goodsTypeId, curPageIndex, pageSize, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getStoreGoodsBrandList,
      data: {
        index: curPageIndex,
        pageSize: pageSize,
        goodsTypeId: goodsTypeId
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 添加商品品牌
   * @param goodsTypeId 商品类型ID
   * @param brandName 品牌名
   * @param enName 品牌英文名
   * @param fileId 品牌logo图片ID
   * @param url 品牌官方URL
   * @param story 品牌故事（简介）
   * @param described 描述
   * @param success
   * @param failure
   */
  public addStoreGoodsBrandInfo(goodsTypeId, brandName, enName, fileId, url, story, described, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.addStoreGoodsBrandInfo,
      data: {
        goodsTypeId: goodsTypeId,
        name: brandName,
        eName: enName,
        fileId: fileId,
        url: url,
        story: story,
        described: described
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 修改商品品牌
   * @param goodsBrandId 商品品牌ID
   * @param goodsTypeId 商品类型ID
   * @param brandName 品牌名
   * @param enName 品牌英文名
   * @param fileId 品牌logo图片ID
   * @param url 品牌官方URL
   * @param story 品牌故事（简介）
   * @param described 描述
   * @param success
   * @param failure
   */
  public updateStoreGoodsBrandInfo(goodsBrandId, goodsTypeId, brandName, enName, fileId, url, story, described, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.updateStoreGoodsBrandInfo,
      data: {
        goodsBrandId: goodsBrandId,
        goodsTypeId: goodsTypeId,
        name: brandName,
        eName: enName,
        fileId: fileId,
        url: url,
        story: story,
        described: described
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 删除商品品牌
   * @param goodsBrandId 商品品牌ID
   * @param success
   * @param failure
   */
  public removeStoreGoodsBrandInfo(goodsBrandId: string, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.removeStoreGoodsBrandInfo,
      data: {
        goodsBrandId: goodsBrandId
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 获取商品基本参数列表
   * @param goodsId 商品ID
   * @param success
   * @param failure
   */
  public getStoreGoodsAttrList(goodsId, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getStoreGoodsAttrList,
      data: {
        goodsId: goodsId
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 获取商品基本参数信息
   * @param sn 商品编号
   * @param success
   * @param failure
   */
  public getStoreGoodsAttr(sn, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getStoreGoodsAttr,
      data: {
        sn: sn
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 添加商品基本参数
   * @param goodsId 商品ID
   * @param paramId 商品类型参数表ID
   * @param valueId 商品类型参数值表ID
   * @param success
   * @param failure
   */
  public addStoreGoodsAttr(goodsId, paramId, valueId, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.addStoreGoodsAttr,
      data: {
        goodsId: goodsId,
        paramId: paramId,
        valueId: valueId
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 修改商品基本参数
   * @param attrId 基础参数ID
   * @param goodsId 商品ID
   * @param paramId 商品类型参数表ID
   * @param valueId 商品类型参数值表ID
   * @param success
   * @param failure
   */
  public updateStoreGoodsAttr(attrId, goodsId, paramId, valueId, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.updateStoreGoodsAttr,
      data: {
        attrId: attrId,
        goodsId: goodsId,
        paramId: paramId,
        valueId: valueId
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 删除商品基本参数
   * @param attrId 商品基本参数ID
   * @param success
   * @param failure
   */
  public removeStoreGoodsAttr(attrId: string, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.removeStoreGoodsAttr,
      data: {
        attrId: attrId
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 获取商品销售属性列表
   * @param goodsId 商品ID
   * @param success
   * @param failure
   */
  public getStoreGoodsSKUList(goodsId, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getStoreGoodsSKUList,
      data: {
        goodsId: goodsId
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 获取商品销售属性信息
   * @param sn 商品编号
   * @param success
   * @param failure
   */
  public getStoreGoodsSKU(skuId, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getStoreGoodsSKU,
      data: {
        skuId: skuId
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 添加商品销售属性
   * @param skuId 商品ID
   * @param goodsId 商品ID
   * @param outerCode 商品类型参数表ID
   * @param productCode 商品类型参数值表ID
   * @param originalPrice 原价
   * @param price 价格
   * @param inventory 库存
   * @param salesVolume 销量
   * @param fileId 图片ID
   * @param skuArrJson SKU选项属性数据
   * @param success
   * @param failure
   */
  public addStoreGoodsSKU(skuId, goodsId, outerCode, productCode, originalPrice, price, inventory, salesVolume, fileId, skuArrJson, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.addStoreGoodsSKU,
      data: {
        skuId: skuId,
        goodsId: goodsId,
        outerCode: outerCode,
        productCode: productCode,
        originalPrice: originalPrice,
        price: price,
        inventory: inventory,
        salesVolume: salesVolume,
        fileId: fileId,
        skuArrJson: skuArrJson,
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 修改商品销售属性
   * @param goodsId 商品ID
   * @param outerCode 商品类型参数表ID
   * @param productCode 商品类型参数值表ID
   * @param originalPrice 原价
   * @param price 价格
   * @param inventory 库存
   * @param salesVolume 销量
   * @param fileId 图片ID
   * @param skuArrJson SKU选项属性数据
   * @param success
   * @param failure
   */
  public updateStoreGoodsSKU(goodsId, outerCode, productCode, originalPrice, price, inventory, salesVolume, fileId, skuArrJson, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.updateStoreGoodsSKU,
      data: {
        goodsId: goodsId,
        outerCode: outerCode,
        productCode: productCode,
        originalPrice: originalPrice,
        price: price,
        inventory: inventory,
        salesVolume: salesVolume,
        fileId: fileId,
        skuArrJson: skuArrJson,
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 删除商品销售属性
   * @param skuId 商品销售属性ID
   * @param success
   * @param failure
   */
  public removeStoreGoodsSKU(skuId: string, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.removeStoreGoodsSKU,
      data: {
        skuId: skuId
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 获取商品轮播图列表
   * @param goodsId 商品ID
   * @param success
   * @param failure
   */
  public getStoreGoodsSlideList(goodsId, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getStoreGoodsSlideList,
      data: {
        goodsId: goodsId
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 添加商品轮播图
   * @param goodsId 商品ID
   * @param fileId 图片ID
   * @param success
   * @param failure
   */
  public addStoreGoodsSlide(goodsId, fileId, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.addStoreGoodsSlide,
      data: {
        goodsId: goodsId,
        fileId: fileId
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 修改商品轮播图
   * @param goodsPicId 商品轮播图ID
   * @param goodsId 商品ID
   * @param fileId 图片ID
   * @param success
   * @param failure
   */
  public updateStoreGoodsSlide(goodsPicId, goodsId, fileId, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.updateStoreGoodsSlide,
      data: {
        goodsPicId: goodsPicId,
        goodsId: goodsId,
        fileId: fileId
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 删除商品轮播图
   * @param goodsPicId 商品轮播图ID
   * @param success
   * @param failure
   */
  public removeStoreGoodsSlide(goodsPicId: string, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.removeStoreGoodsSlide,
      data: {
        goodsPicId: goodsPicId
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 将商品轮播图设置为门店轮播图封面
   * @param goodsPicId 商品轮播图ID
   * @param goodsId 商品ID
   * @param success
   * @param failure
   */
  public setToShopSlideCover(goodsPicId, goodsId, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.setToShopSlideCover,
      data: {
        goodsPicId: goodsPicId,
        goodsId: goodsId
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

  /**
   * 管理员-获取门店列表
   * @param mobile 用户账号
   * @param status 状态：1 待审核 2 不通过  3 通过
   * @param curPageIndex
   * @param pageSize
   * @param success
   * @param failure
   */
  public getAdminShopList(mobile, status, curPageIndex, pageSize, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getAdminShopList,
      data: {
        index: curPageIndex,
        pageSize: pageSize,
        mobile: mobile,
        status: status
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 管理员-获取门店详情
   * @param shopId 门店ID
   * @param success
   * @param failure
   */
  public getAdminShopInfo(shopId, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getAdminShopInfo,
      data: {
        shopId: shopId
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 管理员-修改门店状态
   * @param shopId 门店ID
   * @param status 门店状态 1 待审核 2 不通过  3 通过
   * @param success
   * @param failure
   */
  public updateAdminShopStatus(shopId, status, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.updateAdminShopStatus,
      data: {
        shopId: shopId,
        status: status
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 管理员-获取门店服务列表
   * @param shopId 门店ID
   * @param onSale 是否上架：0 否 1是
   * @param curPageIndex
   * @param pageSize
   * @param success
   * @param failure
   */
  public getAdminShopServiceList(shopId, onSale, curPageIndex, pageSize, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getAdminShopServiceList,
      data: {
        index: curPageIndex,
        pageSize: pageSize,
        shopId: shopId,
        onSale: onSale
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 管理员-修改门店服务
   * @param shopServiceTypeId 门店服务类型id
   * @param shopId 门店申请id
   * @param serviceName 服务名称
   * @param yxPrice 云洗价格
   * @param marketPrice 市场价格
   * @param serviceDetails 服务详情
   * @param onSale 是否上架：0 否 1是
   * @param fileId 服务图片Id
   * @param success
   * @param failure
   */
  public addAdminShopService(shopServiceTypeId, shopId, serviceName, yxPrice, marketPrice, serviceDetails, onSale, fileId, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.updateAdminShopService,
      data: {
        shopServiceTypeId: shopServiceTypeId,
        shopId: shopId,
        serviceName: serviceName,
        yxPrice: yxPrice,
        marketPrice: marketPrice,
        serviceDetails: serviceDetails,
        onSale: onSale,
        fileId: fileId
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 管理员-修改门店服务
   * @param shopServiceId 门店服务id（not null 修改null添加）
   * @param shopServiceTypeId 门店服务类型id
   * @param shopId 门店申请id
   * @param serviceName 服务名称
   * @param yxPrice 云洗价格
   * @param marketPrice 市场价格
   * @param serviceDetails 服务详情
   * @param onSale 是否上架：0 否 1是
   * @param fileId 服务图片Id
   * @param success
   * @param failure
   */
  public updateAdminShopService(shopServiceId, shopServiceTypeId, shopId, serviceName, yxPrice, marketPrice, serviceDetails, onSale, fileId, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.updateAdminShopService,
      data: {
        shopServiceId: shopServiceId,
        shopServiceTypeId: shopServiceTypeId,
        shopId: shopId,
        serviceName: serviceName,
        yxPrice: yxPrice,
        marketPrice: marketPrice,
        serviceDetails: serviceDetails,
        onSale: onSale,
        fileId: fileId
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 管理员-修改门店服务上架状态
   * @param shopServiceId
   * @param onSale
   * @param success
   * @param failure
   */
  public updateAdminShopServiceStatus(shopServiceId, onSale, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.updateAdminShopServiceStatus,
      data: {
        shopServiceId: shopServiceId,
        onSale: onSale
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 管理员-删除门店服务
   * @param shopServiceId
   * @param onSale
   * @param success
   * @param failure
   */
  public removeAdminShopService(shopServiceId, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.removeAdminShopService,
      data: {
        shopServiceId: shopServiceId
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 管理员-获取门店服务订单列表
   * @param shopSn 门店编号
   * @param curPageIndex
   * @param pageSize
   * @param success
   * @param failure
   */
  public getAdminShopServiceOrderList(shopSn, curPageIndex, pageSize, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getAdminShopServiceOrderList,
      data: {
        index: curPageIndex,
        pageSize: pageSize,
        shopSn: shopSn
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 管理员-获取门店服务订单详情
   * @param shopServiceOrderId 门店服务订单ID
   * @param success
   * @param failure
   */
  public getAdminShopServiceOrderInfo(shopServiceOrderId, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getAdminShopServiceOrderInfo,
      data: {
        shopServiceOrderId: shopServiceOrderId
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

  public getRechargeOrderList(sn, mobile, name, curPageIndex: number, pageSize: number, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getRechargeOrderList,
      data: {
        index: curPageIndex,
        pageSize: pageSize,
        sn: sn,
        mobile: mobile,
        name: name
      },
      success: success,
      failure: failure
    });
  }

  public getBonusWithdrawList(sn, mobile, cardNumber, cardType, status, type, curPageIndex: number, pageSize: number, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getBonusWithdrawList,
      data: {
        index: curPageIndex,
        pageSize: pageSize,
        sn: sn,
        mobile: mobile,
        cardNumber: cardNumber,
        cardType: cardType,
        status: status,
        type: type
      },
      success: success,
      failure: failure
    });
  }

  public updateWithdrawStatusList(withdrawId, status, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.updateWithdrawStatusList,
      data: {
        withdrawId: withdrawId,
        status: status
      },
      success: success,
      failure: failure
    });
  }

  //解除禁用会员
  public banOrRecoveryMember(memberId, status, forbiddenTim, reason, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.banOrRecoveryMember,
      data: {
        memberId: memberId,
        status: status,
        forbiddenTim: forbiddenTim,
        reason: reason
      },
      success: success,
      failure: failure
    });
  }

  //人工充值
  public manualCharge(adminId, userId, quota, type, change, described, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.manualCharge,
      data: {
        adminId: adminId,
        userId: userId,
        quota: quota,
        type: type,
        change: change,
        described: described
      },
      success: success,
      failure: failure
    })
  }


  public getCurrQuota(memberId, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getCurrQuota,
      data: {
        memberId: memberId,
      },
      success: success,
      failure: failure
    });
  }

  //人工充值订单
  public manualChargeList(searchItem, type, status, curPageIndex, perPageSize, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.manualChargeList,
      data: {
        searchItem: searchItem,
        type: type,
        status: status,
        index: curPageIndex,
        pageSize: perPageSize
      },
      success: success,
      failure: failure
    });
  }


  //人工充值订单审核
  public updateManuralCharge(manualChargeId, status, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.updateManuralCharge,
      data: {
        manualChargeId: manualChargeId,
        status: status,
      },
      success: success,
      failure: failure
    });
  }

  //人工充值订单复核
  public updatesManualCharge(manualChargeId, status, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.updatesManualCharge,
      data: {
        manualChargeId: manualChargeId,
        status: status,
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

  public addMsg(regionId, title, msgType, content, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.addMsg,
      data: {
        regionId: regionId,
        title: title,
        msgType: msgType,
        content: content
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
        mobile: mobile,
        index: curPageIndex,
        pageSize: pageSize,
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

  public addCarSeries(series: string, carbrandId: string, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.addCarSeries,
      data: {
        series: series,
        carbrandId: carbrandId
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

  //文案管理
  public getDocumentList(title: string, curPageIndex: number, perPageSize: number, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getDocumentList,
      data: {
        title: title,
        index: curPageIndex,
        pageSize: perPageSize
      },
      success: success,
      failure: failure
    })
  }

  //修改文案
  public updateDocument(documentId: string, title: string, content: string, type: number, author: string, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.updateDocument,
      data: {
        documentId: documentId,
        title: title,
        content: content,
        type: type,
        author: author
      },
      success: success,
      failure: failure
    })
  }

  public delDocument(documentId: string, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.delDocument,
      data: {
        documentId: documentId
      },
      success: success,
      failure: failure
    })
  }

  public addDocument(title: string, content: string, type: number, author: string, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.addDocument,
      data: {
        title: title,
        content: content,
        type: type,
        author: author
      },
      success: success,
      failure: failure
    })
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

  //推荐车险管理公司列表
  /**
   * @param searchName
   * @param index
   * @param pageSize
   */

  public getRegionRecommendInsurerList(searchName: string, index: number, pageSize: number, success, failure?) {
    this.apiCall({
      url: this.apiConfig.paths.getregionRecommendInsurerList,
      data: {
        searchName: searchName,
        index: index,
        pageSize: pageSize
      },
      success: success,
      failure: failure
    })
  }

  public getProvinceShortname(success, failure?) {
    this.apiCall({
      url: this.apiConfig.paths.provinceShortname,
      data: {},
      success: success,
      failure: failure
    })
  }

  public getInsurerList(success, failure?) {
    this.apiCall({
      url: this.apiConfig.paths.getinsuranceList,
      data: {},
      success: success,
      failure: failure
    })
  }

  public postRegionSupportInsurance(shortnameId: string, insurerId: string, success, failure?) {
    this.apiCall({
      url: this.apiConfig.paths.addRegionSupportlnsurance,
      data: {
        shortnameId: shortnameId,
        insurerId: insurerId,
      },
      success: success,
      failure: failure
    })
  }

  public updateRegionSupportInsurance(recommendInsurerId: string, insurerId: string, success, failure?) {
    this.apiCall({
      url: this.apiConfig.paths.updateRegionSupportInsurance,
      data: {
        recommendInsurerId: recommendInsurerId,
        insurerId: insurerId
      },
      success: success,
      failure: failure
    })
  }

  public removeRegionSupportInsurance(recommendInsurerId: string, success, failure?) {
    this.apiCall({
      url: this.apiConfig.paths.delRegionSupportInsurance,
      data: {
        recommendInsurerId: recommendInsurerId,
      },
      success: success,
      failure: failure
    })
  }

  /** 上传文件
   * @param formData
   * formData = {adminId: '管理员ID', file: 文件对象}
   */
  public uploadFile(formData, success, failure?) {
    this.apiCall({
      url: this.apiConfig.paths.uploadFile,
      data: formData,
      success: success,
      failure: failure,
      processData: false,
      contentType: false //'multipart/form-data'
    });
  }
}
