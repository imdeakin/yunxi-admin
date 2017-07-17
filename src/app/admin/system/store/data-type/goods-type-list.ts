/**
 * Created by Deakin on 2017/5/15 0015.
 */
export class GoodsTypeList {
  public goods_type_id: string; // 商品类型ID
  public p_goods_type_id: string; // 商品分类父节点
  public type_name: string; // 商品类型名称
  public status: number; // 状态
  public code: string; // 编码
  public level: string; // 级别
  public curr_child_sort: number; // 子节点当前的排序号（无子节点为null）
  public sort: number; // 排序
}
