/**
 * Created by Deakin on 2017/5/15 0015.
 */
export class AdList {
  public ad_id:string;
  public file_id: string; // 业务ID
  public url: string; // 图片
  public title: string; // 标题
  public create_time: string; // 发送时间
  public position_code: string; // 位置 首页：index, 商城：mall，商埔：store 购物车：shoppingcart 加油：addGa 违章：illegal
  public business_id: string; // 业务ID
  public is_show: string; // 是否可见:1 可见 0 不可见
  public sort: number; // 排序
}
