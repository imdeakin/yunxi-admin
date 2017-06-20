/**
 * Created by Deakin on 2017/5/15 0015.
 */
export class BonusWithdrawListList {
  public sn: string; // 订单号
  public mobile: string; // 用户账号
  public type: number; // 用户类型：1会员 2合伙人 3门店
  public money: number; // 金额
  public bank: string; // 银行名
  public bank_branch: string; // 银行支行
  public card_number: string; // 卡号/支付宝号
  public card_type: string; // 类型：1、储蓄卡，2,、支付宝
  public status: number; // 状态：1、待审核 2、审核通过 3、审核不通过 4、已处理(含审核通过和不通过，用于筛选出这2个状态的订单时使用)
  public create_time: string; // 创建时间
}
