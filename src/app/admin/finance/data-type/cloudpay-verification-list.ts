/**
 * Created by Deakin on 2017/5/15 0015.
 */
export class CloudpayVerificationList {
  public order_id: string; // 订单ID
  public sn: string; // 订单号
  public mobile: string; // 用户账号
  public yft_account: string; // 云付通账号
  public create_time: string; // 发送时间
  public money: string; // 金额
  public status: number; // 状态
}
