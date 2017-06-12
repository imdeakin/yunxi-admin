/**
 * Created by Deakin on 2017/5/15 0015.
 */
export class OrderList {
  public order_id: string;// 订单Id
  public sn: string;// 订单编号
  public mobile: string;// 下单人帐号
  public create_time: string;// 下单时间
  public logistics_type: number;// 物流类型
  public num: number;// 数量
  public total_price: number;// 总价格
  public actual_price: number;// 实付价格 (订单价格) = 总价格 + 运费
  public has_freight: number;// 是否运费
  public freight: number;// 运费
  public waybill_number: string;// 运单号
  public trade_mode: number;// 交易方式
  public pay_time: string;// 支付时间
  public contact: string;// 收货联系人
  public express_name: string;// 快递名称
  public address: string;// 收货具体地址
  public contact_mobile: string;// 收货联系电话
  public status: number;// 订单状态
}
