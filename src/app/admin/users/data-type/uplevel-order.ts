/**
 * Created by Deakin on 2017/5/15 0015.
 */
export class UplevelRecord {
  public sn:string;// 订单号
  public current_member_name: string;// 当前会员等级ID
  public before_member_name: string;// 升级前的会员等级ID
  public price: number;// 升级费用
  public create_time: string;// 升级时间
  public mobile: string;// 用户账户
  public region_name: string;// 地区名
  public status: number;// 状态：0、待支付，1、成功，-1、失败 ，-2、取消升级
}
