/**
 * Created by Deakin on 2017/5/15 0015.
 */
export class RelationList {
  public mobile:string;// 会员账号(用户表手机号)
  public create_time: string;// 注册时间
  public parent_member_account: string;// 上级会员账号=账号
  public member_level_name: string;// 会员等级ID
  public level: string;// 一级市场（推荐的人）
  public level2: string;// 二级市场（推荐的人）
  public level3: string;// 三级市场（推荐的人）
}
