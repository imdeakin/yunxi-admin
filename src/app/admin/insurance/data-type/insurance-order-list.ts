/**
 * Created by Administrator on 2017/6/7.
 */
export class InsuranceOrderList {
  public insurance_order_id: string; // 车险订单ID
  public sn: string; // 订单编号
  public biz_id: string; // 智通业务号
  public trade_mode: number; // 支付类型
  public trade_code: string; // 交易流水号
  public car_number: string; // 车牌号码
  public name: string; // 车主姓名
  public mobile: string; // 车主手机号码
  public insurer_name: string; // 保险公司名称
  public city_name: string; // 投保城市名称
  public pay_time: string; // 支付时间
  public synch_flag: number; // 是否同步返回结果0-同步；1-异步
  public msg: string; // 核保失败的原因，只有核保失败才会存
  public status: number; // 状态：-1、加入购物车==算价为核保
  //============================ 2、核保失败
  //============================ 3、核保(同步、异步)成功==待支付
  //============================ 4、异步核保==需等待结果
  //============================ 5、已支付
  //============================ 6、受理中
  //============================ 7、已完成(承保成功)
  //============================ 8、算价失败
  //============================ 9、待验证(云付通)
}
