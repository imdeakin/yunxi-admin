/**
 * Created by Deakin on 2017/5/15 0015.
 */
export class PartnerApplyList {
  public partner_apply_id:string;// 代理申请表ID
  public agreement_code: string;// 合同编号
  public name: string;// 姓名
  public mobile: string;// 手机号
  public region_name: string;// 地区名
  public partner_level: string;// 代理级别ID
  public create_time: string;// 申请时间
  public handler: string;// 经办人
  public status: number;// 0待审核,1通过,-1审核不通过
}
