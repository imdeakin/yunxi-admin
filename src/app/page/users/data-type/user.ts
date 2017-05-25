/**
 * Created by Deakin on 2017/5/15 0015.
 */
export class User {
  public member_id: string;// 会员ID
  public member_mobile: string;// 会员账号
  public upmember_mobile: string;// 上级会员账号
  public member_level_name: string;// 会员等级
  public create_time: string;// 创建时间
  public last_login_time: string;// 最后登录时间
  public last_login_ip: string;// 最后登录IP
  public region_name: string;// 所属城市
}
