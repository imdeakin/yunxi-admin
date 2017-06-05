/**
 * Created by Deakin on 2017/5/15 0015.
 */
export class YoukaOrder {
  public charge_order_id: string;// 油卡充值订单ID
  public oil_card: string;// 油卡号码 （油卡姓名）
  public sn: string;// 订单编号 （加油卡号）
  public trade_code: string;// 交易流水号（第三方支付通道的订单号）
  public mobile: number;// 用户账号 （类型）
  public total_periods: number;// 总期数(套餐需填入) （）
  public used_periods: number;//  已用期数(套餐需填入)（）
  public pay_time: number;//  支付时间（）
  public create_time: number;//  到账时间（到账记录表）（）
  public amount: number;// 总金额 （）
  public price: number;//  每期金额（）
  public classify: number;// 分类：1、默认套餐，2、优惠活动，3、会员专享 （）
  public described: number;// 业务项（描述）（）
  public status: number;//  状态：0待审核，1待返还(订单已充值成功，待返还)，2不予充值，-1加入购物车，3取消，4删除，5 已完成(订单返还结束)，6 待支付（）
}
