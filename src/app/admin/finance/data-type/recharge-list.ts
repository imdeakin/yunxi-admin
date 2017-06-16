/**
 * Created by Deakin on 2017/5/15 0015.
 */
export class CloudpayVerificationList {
  public charge_order_id: string; // 订单ID
  public sn: string; // 订单号
  public mobile: string; // 用户账号
  public name: string; // 用户名
  public trade_mode: number; // 交易方式
  public yft_account: string; // 云付通账号
  public create_time: string; // 充值时间
  public money: number; // 金额
  public handler: string; // 经手人（云付通专有）
  public handle_time: string; // 经手时间（云付通专有）
  public handle_money: number; // 打入金额（云付通专有）
  public status: number; // 充值状态：1，成功，2，等待付款，3，待核验，4，失败,
}
