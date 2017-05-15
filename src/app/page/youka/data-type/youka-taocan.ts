/**
 * Created by Deakin on 2017/5/15 0015.
 */
export class YoukaTaocan {
  public oil_package_id: string;// 加油套餐ID
  public create_time: string;// 创建时间
  public amount: string;// 每期返还金额
  public eachs: number;// 分期数
  public classify: number;// 分类：1、默认套餐，2、优惠活动，3、会员专享
  public type: number;// 类型：1、分期到账，2、即时到账充值
  public need_points: number;// 购买套餐需要的积分

  public static getClassText(classify: number): string {
    let text: string;
    switch (classify) {
      case 2:
        text = '优惠活动';
        break;
      case 3:
        text = '会员专享';
        break;
      default:
        text = '默认套餐'
    }
    return text;
  }

  public static getTypeText(type: number): string {
    let text: string;
    switch (type) {
      case 2:
        text = '即时到账充值';
        break;
      default:
        text = '分期到账'
    }
    return text;
  }
}
