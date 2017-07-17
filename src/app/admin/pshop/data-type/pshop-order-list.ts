/**
 * Created by Deakin on 2017/5/15 0015.
 */
export class PShopOrderList {
  public code: string; // 订单编号
  public mobile: string; // 买家账号
  public server: string; // 服务
  public pay_type: number; // 付款方式
  public price: number; // 金额
  public region_name: string; // 所属地区
  public create_time: string; // 下单时间
  public pay_time: string; // 付款时间
  public status: number; // 状态
}
