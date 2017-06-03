/**
 * Created by Deakin on 2017/5/15 0015.
 */
export class OrderList {
  public code: string;// 订单编号
  public mobile: string;// 买家账号
  public create_time: string;// 下单时间
  public price: string;// 订单金额
  public status: number;// 订单状态
  public pay_type: number;// 支付方式
  public sign_time: string;// 签收时间
  public track_num: string;// 物流单号
}
