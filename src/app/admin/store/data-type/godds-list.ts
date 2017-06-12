/**
 * Created by Deakin on 2017/5/15 0015.
 */
export class GoodsList {
  public goods_id: string;// 订单号
  public sn: string;// 商品编号
  public goods_type_id: string;// 商品类型ID
  public business_name: string;// 商品名称
  public described: string;// 商品描述
  public producer: string;// 产地
  public on_sale: number;// 是否上架：0 否 1是
  public freight: number;// 运费
  public see_count: number;// 浏览数量
  public create_time: string;// 创建时间
  public update_time: string;// 更新时间
  public price: string;// 总价格(可能范围数)
}
