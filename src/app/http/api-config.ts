/**
 * Created by Administrator on 2017/3/3.
 */
import {Injectable} from '@angular/core';

@Injectable()
export class ApiConfig {
  public server: string = 'http://yx.51meets.com'; // http://www.gzyueyun.com 本地192.168.3.5:8082http://yx.51meets.com
  public root: string = this.server + '';
  public imgRoot: string = this.server + '';
  public paths = {
    login: this.root + '/adUser/login', // 登录

    getAdminInfo: this.root + '/system/adminInfo', // 获取管理员信息
    getSalesInfo: this.root + '/system/getSalesInfo', // 获取销售信息

    // 油卡管理
    getYoukaTaocanList: this.root + '/oiling/packageInfoList', // 获取油卡套餐列表
    getYoukaBindList: this.root + '/oiling/oilBoundList', // 获取油卡套餐列表
    getYoukaOrderList: this.root + '/oiling/chargeOrderdList', // 获取油卡购买套餐订单列表
    getYoukaRecordManageList: this.root + '/oiling/chargeOrderdList', // 获取油卡到账记录列表
    updateYoukaTaocanList: this.root + '/oiling/updatePackageInfo',//编辑油卡套餐
    addYoukaTaocanList: this.root + '/oiling/addPackageInfo',//增加油卡套餐
    removeYoukaTaocanList: this.root + '/oiling/delPackageInfo',//删除油卡列表
    YouCardOrderReturn: this.root + '/oiling/upadteCardOrderAndCardOrderReturn',//油卡订单返还
    getYoucardOrderReturnList: this.root + '/oiling/cardOrderReturnList',//油卡到账记录表
    getCardOrderReturn: this.root + '/oiling/getCardOrderReturn',//油卡到账详情

    //违章管理
    getCanWeizhangList: this.root + '/peccancyManage/peccancyOrderList',//获取可办理违章
    getCanWeizhangData: this.root + '/peccancyManage/getHandleOrderNeeds',//获取可办理违章资料
    postPeccancyMsg: this.root + '/peccancyManage/sendVcode',//发送短信验证码接口
    postPeccancyManage: this.root + '/peccancyManage/saveOrder',//管理
    comfirmCxyPayOrder: this.root + '/peccancyManage/comfirmCxyPayOrder',//确认可支付接口
    setOrderMoneyAndServiceFee: this.root + '/peccancyManage/setOrderMoneyAndServiceFee',//设置不可办理订单的办理违章所需价格和云洗利润服务费
    comfirmOrderOfDoing: this.root + '/peccancyManage/comfirmOrderOfDoing',//办理不可支付订单
    comfirmOrderOfFinish: this.root + '/peccancyManage/comfirmOrderOfFinish',//确认不可支付订单

    // 车险管理
    getInsuranceOrderList: this.root + '/insurancemanage/insuranceOrderList', // 获取车险订单列表

    //推荐车险管理
    getregionRecommendInsurerList: this.root + '/system/regionRecommendInsurerList',//推荐车险管理列表
    provinceShortname: this.root + '/system/provinceShortname',//获取省份缩写
    getinsuranceList: this.root + '/system/insuranceList',//获取所有保险公司
    delRegionSupportInsurance: this.root + '/system/delRegionSupportInsurance',//删除地区推荐的保险公司
    addRegionSupportlnsurance: this.root + '/system/addRegionSupportInsurance',//添加地区推荐的保险公司
    updateRegionSupportInsurance: this.root + '/system/updateRegionSupportInsurance',//修改地区推荐的保险公司

    // 会员管理
    getUserList: this.root + '/members/memberInfoList', // 获取会员列表
    getUserInfo: this.root + '/members/getMemberInfo', // 获取会员详情
    getLevelRecordList: this.root + '/members/memberUpgradeList', // 获取会员升级记录列表
    getLevelOrderList: this.root + '/members/memberUpgradeOrder', // 获取会员升级订单列表
    getRelationList: this.root + '/members/getRelationInfo', // 获取推介关系列表
    updateMemberInfo: this.root + '/members/updateMemberInfo',//修改会员等级信息
    getStatisticsData: this.root + '/members/statisticsData',//推广会员统计表
    getMyMemberList:this.root + '/members/myMemberList',//我的会员列表

    // 合伙人管理
    getPartnerList: this.root + '/copartner/selectPartnerList', // 获取合伙人列表
    getPartnerInfo: this.root + '/copartner/getPartnerInfo', // 获取合伙人详情
    getPartnerApplyList: this.root + '/copartner/applyPartnerList', // 获取合伙人申请列表
    getPartnerApplyInfo: this.root + '/copartner/applyPartnerInfo', // 获取合伙人申请详情
    getAuditPass: this.root + '/copartner/auditPass',//审批
    getReexamine: this.root + '/copartner/reexamine',//复核

    /*
     * 商城管理
     */

    // 商品列表
    getStoreGoodsList: this.root + '/marketManage/mallGoodsList', // 获取商品列表
    addStoreGoods: this.root + '/marketManage/addMallGoods', // 添加商品
    updateStoreGoods: this.root + '/marketManage/updateMallGoods', // 修改商品
    removeStoreGoods: this.root + '/marketManage/delMallGoods', // 删除商品

    // 商品信息
    getStoreGoodsInfo: this.root + '/marketManage/getMallGoods', // 获取商品信息
    addStoreGoodsInfo: this.root + '/marketManage/saveMallGoods', // 添加商品信息
    updateStoreGoodsInfo: this.root + '/marketManage/saveMallGoods', // 修改商品信息
    updateStoreGoodsDetail: this.root + '/marketManage/saveMallGoodsInstruction', // 修改商品详情

    // 商品类型
    getStoreGoodsTypeList: this.root + '/brandGoodsTypeManage/mallGoodsTypeList', // 获取商品类型列表
    addStoreGoodsTypeInfo: this.root + '/brandGoodsTypeManage/saveMallGoodsType', // 添加商品类型信息
    updateStoreGoodsTypeInfo: this.root + '/brandGoodsTypeManage/saveMallGoodsType', // 更新商品类型信息
    removeStoreGoodsTypeInfo: this.root + '/brandGoodsTypeManage/delMallGoodsType', // 删除商品类型信息

    // 商品类型参数
    getStoreGoodsTypeAttrList: this.root + '/brandGoodsTypeManage/mllGoodsParamList', // 获取商品类型参数列表
    addStoreGoodsTypeAttr: this.root + '/brandGoodsTypeManage/saveMllGoodsParam', // 添加商品类型参数
    updateStoreGoodsTypeAttr: this.root + '/brandGoodsTypeManage/saveMllGoodsParam', // 更新商品类型参数
    removeStoreGoodsTypeAttr: this.root + '/brandGoodsTypeManage/delMllGoodsParam', // 删除商品类型参数

    // 商品类型参数值
    getStoreGoodsTypeAttrValList: this.root + '/brandGoodsTypeManage/mllGoodsParamValueList', // 获取商品类型参数列表
    addStoreGoodsTypeAttrVal: this.root + '/brandGoodsTypeManage/saveMllGoodsParamValue', // 添加商品类型参数
    updateStoreGoodsTypeAttrVal: this.root + '/brandGoodsTypeManage/saveMllGoodsParamValue', // 更新商品类型参数
    removeStoreGoodsTypeAttrVal: this.root + '/brandGoodsTypeManage/delMllGoodsParamValue', // 删除商品类型参数

    // 商品品牌
    getStoreGoodsBrandList: this.root + '/brandGoodsTypeManage/mallGoodsBrandList', // 获取商品品牌列表
    addStoreGoodsBrandInfo: this.root + '/brandGoodsTypeManage/saveMllGoodsBrand', // 添加商品品牌信息
    updateStoreGoodsBrandInfo: this.root + '/brandGoodsTypeManage/saveMallGoodsBrand', // 更新商品品牌信息
    removeStoreGoodsBrandInfo: this.root + '/brandGoodsTypeManage/delMallGoodsBrand', // 删除商品品牌信息

    // 商品基础参数
    getStoreGoodsAttrList: this.root + '/marketManage/mallGoodsAttrList', // 获取商品基础参数列表
    getStoreGoodsAttr: this.root + '/marketManage/getMallGoodsAttr', // 获取商品基础参数
    addStoreGoodsAttr: this.root + '/marketManage/saveMallGoodsAttr', // 添加商品基础参数
    updateStoreGoodsAttr: this.root + '/marketManage/saveMallGoodsAttr', // 更新商品基础参数
    removeStoreGoodsAttr: this.root + '/marketManage/delMallGoodsAttr', // 删除商品基础参数

    // 商品销售属性
    getStoreGoodsSKUList: this.root + '/marketManage/mallGoodsSkuList', // 获取商品销售属性列表
    getStoreGoodsSKU: this.root + '/marketManage/getMallGoodsSku', // 获取商品销售属性
    addStoreGoodsSKU: this.root + '/marketManage/saveMallGoodsSku', // 添加商品销售属性
    updateStoreGoodsSKU: this.root + '/marketManage/saveMallGoodsSku', // 更新商品销售属性
    removeStoreGoodsSKU: this.root + '/marketManage/delMallGoodsSku', // 删除商品销售属性

    // 商品轮播图
    getStoreGoodsSlideList: this.root + '/marketManage/mallGoodsPicList', // 获取商品轮播图列表
    addStoreGoodsSlide: this.root + '/marketManage/saveMallGoodsPic', // 添加商品轮播图
    updateStoreGoodsSlide: this.root + '/marketManage/saveMallGoodsPic', // 更新商品轮播图
    removeStoreGoodsSlide: this.root + '/marketManage/delMallGoodsPic', // 删除商品轮播图
    setToShopSlideCover: this.root + '/marketManage/setIsCover', // 将商品轮播图设置为门店轮播图封面

    // 订单
    getStoreOrderList: this.root + '/marketManage/mallOrderList', // 获取订单列表
    updateStoreOrder: this.root + '/marketManage/updateMallOrder', // 修改订单信息
    signStoreOrder: this.root + '/marketManage/mallOrderSign', // 签收订单
    updateStoreOrderExpress: this.root + '/marketManage/updateOrderExpress', // 修改订单物流信息
    getStoreExpressList: this.root + '/marketManage/getExpressList', // 获取物流列表

    /*
     * 门店管理
     */

    // 管理员-门店列表
    getAdminShopList: this.root + '/adminShop/mallSshopList', // 获取门店列表
    getAdminShopInfo: this.root + '/adminShop/getMallShop', // 获取门店详情
    updateAdminShopStatus: this.root + '/adminShop/updateMallShopStatus', // 修改门店状态

    // 管理员-门店服务
    getAdminShopService: this.root + '/adminShop/mallShopServiceList', // 获取门店服务列表
    addAdminShopService: this.root + '/adminShop/saveShopService', // 添加门店服务
    updateAdminShopService: this.root + '/adminShop/saveShopService', // 修改门店服务
    updateAdminShopServiceStatus: this.root + '/adminShop/onSaleShopService', // 修改门店服务上架状态
    removeAdminShopService: this.root + '/adminShop/delShopService', // 删除门店服务

    // 财务管理
    getCloudpayVerificationList: this.root + '/finance/yftOrderVerificationList', // 获取云付通核验列表
    updateCloudpayVerification: this.root + '/finance/yftVerification', // 云付通核验
    getRechargeOrderList: this.root + '/finance/accountTransferOrderList', // 获取充值订单列表
    getBonusWithdrawList: this.root + '/finance/accountWithdrawList', // 获取奖金提现列表
    updateWithdrawStatusList:this.root + '/finance/updateWithdrawStatus',//更新奖金提现状态

    //门店管理
    getMallSshopList: this.root + '/adminShop/mallSshopList',//获取门店列表
    getMallShop: this.root + '/adminShop/getMallShop',//获取门店详情
    updateMallShopStatus: this.root + '/adminShop/updateMallShopStatus',//修改门店状态
    getMallShopServiceList: this.root + '/adminShop/mallShopServiceList',//获取门店服务列表
    getMallShopServiceOrderList: this.root + '/adminShop/mallShopServiceOrderList',//获取门店订单列表
    getMallShopServiceOrder: this.root + '/adminShop/getMallShopServiceOrder',//获取门店订单详情

    // 消息管理
    getMsgList: this.root + '/sysMsg/sysMsgList', // 获取消息列表
    addMsg: this.root + '/sysMsg/addSysMsg', // 添加消息
    updateMsg: this.root + '/sysMsg/updateSysMsg', // 修改消息
    removeMsg: this.root + '/sysMsg/delSysMsg', // 删除消息

    // 反馈管理
    getFeedbackList: this.root + '/sysMsg/feedbackList', // 获取反馈列表
    getFeedbackInfo: this.root + '/sysMsg/feedbackInfo', // 获取反馈详情
    removeFeedback: this.root + '/sysMsg/delFeedback', // 删除反馈

    // 广告
    getAdList: this.root + '/system/getSlideshowList', // 获取广告列表
    addAd: this.root + '/system/addSlideshow', // 添加广告信息
    updateAd: this.root + '/system/updateSlideshow', // 修改广告信息
    removeAd: this.root + '/system/delSlideshow', // 删除广告信息

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

    // 角色
    getRoleList: this.root + '/system/getRoleList', // 获取角色列表
    addRole: this.root + '/system/addRole', // 添加角色
    updateRole: this.root + '/system/updateRole', // 修改角色
    removeRole: this.root + '/system/delRole', // 删除角色

    //文案管理
    getDocumentList: this.root + '/system/getDocumentList',//查询文案列表
    addDocumentList: this.root + '/system/addDocument',//添加文案列表
    updateDocument: this.root + '/system/updateDocument',//编辑文案列表
    delDocument: this.root + '/system/delDocument',//删除文案列表
    addDocument: this.root + '/system/addDocument',//增加文案列表

    //上传文件
    uploadFile: this.root + '/adfile/upload'
  };

  public getImgFullPath(imgPath: string): string {
    return this.imgRoot + '/' + imgPath.replace(/^\//, '');
  }
}
