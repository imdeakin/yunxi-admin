/**
 * Created by Deakin on 2017/5/16 0016.
 */
export class AdFunction {
  // 消息类型选项组
  public static msgTypeOptions = [
    {
      value: '',
      text: '不限'
    },
    {
      value: '0',
      text: '优惠促销'
    },
    {
      value: '1',
      text: '公告'
    }
  ];

  // 反馈状态选项组
  public static feebackStatusOptions = [
    {
      value: '',
      text: '不限'
    },
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
      case 0:
        text = '优惠促销';
        break;
      case 1:
        text = '公告';
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
