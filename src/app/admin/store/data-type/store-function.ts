/**
 * Created by Deakin on 2017/5/16 0016.
 */
export class StoreFunction {
  // 商品状态选项组
  public static goodsStatusOptions = [
    {
      value: '1',
      text: '市级代理'
    },
    {
      value: '2',
      text: '省级代理'
    },
    {
      value: '3',
      text: '全国代理'
    }
  ];

  // 商品类型选项组
  public static goodsTypeOptions = [
    {
      value: '1',
      text: '市级代理'
    },
    {
      value: '2',
      text: '省级代理'
    },
    {
      value: '3',
      text: '全国代理'
    }
  ];

  // 订单状态选项组
  public static orderStatusOptions = [
    {
      value: '-2',
      text: '取消'
    },
    {
      value: '-1',
      text: '失败'
    },
    {
      value: '0',
      text: '待支付'
    },
    {
      value: '1',
      text: '成功'
    }
  ];

  // 支付方式选项组
  public static payTypeOptions = [
    {
      value: '0',
      text: '支付宝'
    },
    {
      value: '1',
      text: '微信'
    },
    {
      value: '2',
      text: '银联'
    }
  ];

  // 商品状态 和 商品品牌选项组 0、禁用，1、正常
  public static typeStatusOptions = [
    {
      value: '0',
      text: '禁用'
    },
    {
      value: '1',
      text: '正常'
    }
  ];

  // 合伙人等级
  public static getPartnerLevelText(code: number): string {
    let text: string;
    switch (code) {
      case 1:
        text = '市级代理';
        break;
      case 2:
        text = '省级代理';
        break;
      case 3:
        text = '全国代理';
        break;
      default:
        text = '未知'
    }
    return text;
  }

  // 合伙人申请状态
  public static getPartnerApplyStatusText(code: number): string {
    let text: string;
    switch (code) {
      case -1:
        text = '审核不通过';
        break;
      case 0:
        text = '待审核';
        break;
      case 1:
        text = '通过';
        break;
      default:
        text = '未知'
    }
    return text;
  }

  // 订单状态 0、待支付，1、成功，-1、失败 ，-2、取消
  public static getOrderStatusText(status: number): string {
    let text: string;
    switch (status) {
      case -2:
        text = '取消';
        break;
      case -1:
        text = '失败';
        break;
      case 0:
        text = '待支付';
        break;
      case 1:
        text = '成功';
        break;
      default:
        text = '未知状态'
    }
    return text;
  }

  // 订单状态 0、支付宝，1、微信，2、银联
  public static getPayTypeText(type: number): string {
    let text: string;
    switch (type) {
      case 0:
        text = '支付宝';
        break;
      case 1:
        text = '微信';
        break;
      case 2:
        text = '银联';
        break;
      default:
        text = '未知'
    }
    return text;
  }

  // 商品状态 和 商品品牌 0、禁用，1、正常
  public static getTypeStatusText(code: number): string {
    let text: string;
    switch (code) {
      case 0:
        text = '禁用';
        break;
      case 1:
        text = '正常';
        break;
      default:
        text = '未知'
    }
    return text;
  }

}
