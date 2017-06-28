/**
 * Created by Deakin on 2017/5/16 0016.
 */
export class ShopFunction {
  // 门店状态选项组
  public static shopStatusOptions = [
    {
      value: '1',
      text: '待审核'
    },
    {
      value: '2',
      text: '不通过'
    },
    {
      value: '3',
      text: '通过'
    }
  ];

  // 门店服务状态选项组
  public static shopServerStatusOptions = [
    {
      value: '0',
      text: '已下架'
    },
    {
      value: '1',
      text: '上架中'
    }
  ];

  // 订单状态选项组
  public static orderStatusOptions = [
    {
      value: '',
      text: '不限'
    },
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

  // 银行卡类型选项组
  public static bounsCardTypeOptions = [
    {
      value: '1',
      text: '储蓄卡'
    },
    {
      value: '2',
      text: '信用卡'
    }
  ];

  // 门店状态
  public static getShopStatusText(code: number): string {
    let text: string;
    switch (code) {
      case 1:
        text = '待审核';
        break;
      case 2:
        text = '不通过';
        break;
      case 3:
        text = '通过';
        break;
      default:
        text = '未知'
    }
    return text;
  }

  // 门店服务状态
  public static getShopServerStatusText(code: number): string {
    let text: string;
    switch (code) {
      case 0:
        text = '已下架';
        break;
      case 1:
        text = '上架中';
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

  // 银行卡类型
  public static getBankCardTypeText(code: number): string {
    let text: string;
    switch (code) {
      case 1:
        text = '储蓄卡';
        break;
      case 2:
        text = '信用卡';
        break;
      default:
        text = '未知'
    }
    return text;
  }
}
