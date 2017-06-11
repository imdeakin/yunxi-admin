/**
 * Created by Deakin on 2017/5/16 0016.
 */
export class MsgFunction {
  // 消息类型选项组
  public static msgTypeOptions = [
    {
      value: '1',
      text: '客户服务'
    },
    {
      value: '2',
      text: '物流通知'
    },
    {
      value: '3',
      text: '订单提醒'
    },
    {
      value: '4',
      text: '优惠促销'
    },
    {
      value: '5',
      text: '系统消息'
    }
  ];

  // 反馈状态选项组
  public static feebackStatusOptions = [
    {
      value: '0',
      text: '待回复'
    },
    {
      value: '1',
      text: '已处理'
    }
  ];

  // 消息类型
  public static getMsgTypeText(code: number): string {
    let text: string;
    switch (code) {
      case 1:
        text = '客户服务';
        break;
      case 2:
        text = '物流通知';
        break;
      case 3:
        text = '订单提醒';
        break;
      case 4:
        text = '优惠促销';
        break;
      case 5:
        text = '系统消息';
        break;
      default:
        text = '未知'
    }
    return text;
  }

  // 反馈状态
  public static getFeebackStatusText(code: number): string {
    let text: string;
    switch (code) {
      case 0:
        text = '待回复';
        break;
      case 1:
        text = '已处理';
        break;
      default:
        text = '未知'
    }
    return text;
  }
}
