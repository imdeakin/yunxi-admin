/**
 * Created by Deakin on 2017/5/16 0016.
 */
export class FinanceFunction {
  // 云付通订单类型选项组
  public static cloudpayOrderTypeOptions = [
    {
      value: '0',
      text: '充值订单'
    },
    {
      value: '1',
      text: '车险业务'
    },
    {
      value: '2',
      text: '违章业务'
    },
    {
      value: '3',
      text: '加油业务'
    },
    {
      value: '4',
      text: '会员升级'
    },
    {
      value: '5',
      text: '官方商城业务'
    },
    {
      value: '6',
      text: '门店消费业务'
    }
  ];

  // 云付通订单状态选项组
  public static cloudpayOrderStatusOptions = [
    {
      value: '-1',
      text: '核验失败'
    },
    {
      value: '1',
      text: '待核验'
    },
    {
      value: '2',
      text: '已通过'
    }
  ];

  // 云付通订单类型 0.充值订单 1.车险业务 2.违章业务 3.加油业务 4.会员升级 5.官方商城业务 6.门店消费业务
  public static getCloudpayOrderTypeText(code: number): string {
    let text: string;
    switch (code) {
      case 0:
        text = '充值订单';
        break;
      case 1:
        text = '车险业务';
        break;
      case 2:
        text = '违章业务';
        break;
      case 3:
        text = '加油业务';
        break;
      case 4:
        text = '会员升级';
        break;
      case 5:
        text = '官方商城业务';
        break;
      case 6:
        text = '门店消费业务';
        break;
      default:
        text = '未知'
    }
    return text;
  }

  // 云付通订单状态
  public static getCloudpayOrderStatusText(code: number): string {
    let text: string;
    switch (code) {
      case -1:
        text = '核验失败';
        break;
      case 1:
        text = '待核验';
        break;
      case 2:
        text = '已通过';
        break;
      default:
        text = '未知'
    }
    return text;
  }
}
