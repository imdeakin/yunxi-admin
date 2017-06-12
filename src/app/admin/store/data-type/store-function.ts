/**
 * Created by Deakin on 2017/5/16 0016.
 */
export class StoreFunction {
  // 商品上架状态选项组
  public static goodsStatusOptions = [
    {
      value: '0',
      text: '否'
    },
    {
      value: '1',
      text: '是'
    }
  ];

  // 是否含运费选项组
  public static orderFreightStatusOptions = [
    {
      value: '0',
      text: '否'
    },
    {
      value: '1',
      text: '是'
    }
  ];

  // 订单状态选项组
  public static orderStatusOptions = [
    {
      value: '-1',
      text: '删除'
    },
    {
      value: '1',
      text: '待支付'
    },
    {
      value: '2',
      text: '已支付'
    },
    {
      value: '3',
      text: '待发货'
    },
    {
      value: '4',
      text: '待评价'
    },
    {
      value: '5',
      text: '已评价'
    },
    {
      value: '6',
      text: '已取消'
    },
    {
      value: '7',
      text: '已退单'
    },
    {
      value: '8',
      text: '待验证'
    }
  ];

  // 支付方式选项组
  public static payTypeOptions = [
    {
      value: '1',
      text: '支付宝'
    },
    {
      value: '2',
      text: '微信'
    },
    {
      value: '3',
      text: '云付通'
    },
    {
      value: '4',
      text: '余额'
    }
  ];

  // 物流类型选项组
  public static expressTypeOptions = [
    {
      value: '1',
      text: '快递'
    },
    {
      value: '2',
      text: '平邮'
    },
    {
      value: '3',
      text: 'EMS'
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

  // 商品上架状态 0、否，1、是
  public static getGoodsStatusText(status: number): string {
    let text: string;
    switch (status) {
      case 0:
        text = '否';
        break;
      case 1:
        text = '是';
        break;
      default:
        text = '未知'
    }
    return text;
  }

  // 是否含运费 0、否，1、是
  public static getOrderFreightStatusText(status: number): string {
    let text: string;
    switch (status) {
      case 0:
        text = '否';
        break;
      case 1:
        text = '是';
        break;
      default:
        text = '未知'
    }
    return text;
  }

  // 订单状态  -1 删除 1 待支付  2 已支付(待发货)  3 待收货  4 待评价 5 已评价  6 已取消  7 已退单  8 待验证
  public static getOrderStatusText(status: number): string {
    let text: string;
    switch (status) {
      case -1:
        text = '删除';
        break;
      case 1:
        text = '待支付';
        break;
      case 2:
        text = '已支付';
        break;
      case 3:
        text = '待收货';
        break;
      case 4:
        text = '待评价';
        break;
      case 5:
        text = '已评价';
        break;
      case 6:
        text = '已取消';
        break;
      case 7:
        text = '已退单';
        break;
      case 8:
        text = '待验证';
        break;
      default:
        text = '未知'
    }
    return text;
  }

  // 订单状态 1、支付宝，2、微信，3、云付通，4、余额
  public static getPayTypeText(type: number): string {
    let text: string;
    switch (type) {
      case 1:
        text = '支付宝';
        break;
      case 2:
        text = '微信';
        break;
      case 3:
        text = '云付通';
        break;
      case 4:
        text = '余额';
        break;
      default:
        text = '未知'
    }
    return text;
  }

  // 物流类型 1、快递，2、平邮，3、EMS
  public static getExpressTypeText(type: number): string {
    let text: string;
    switch (type) {
      case 1:
        text = '快递';
        break;
      case 2:
        text = '平邮';
        break;
      case 3:
        text = 'EMS';
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
