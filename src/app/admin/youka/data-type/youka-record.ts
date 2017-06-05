/**
 * Created by Deakin on 2017/5/15 0015.
 */
export class YoukaRecord {
  public charge_order_id: string;// 油卡充值订单ID
  public oil_card: string;// 油卡号码
  public create_time: number;//  到账时间
  public price: number;//  到账金额
  public described: number;// 套餐描述
  public total_periods: number;// 总期数
  public used_periods: number;//  已用期数
}
