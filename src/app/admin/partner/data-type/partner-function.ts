/**
 * Created by Deakin on 2017/5/16 0016.
 */
export class PartnerFunction {
  // 合伙人等级选项组
  public static partnerLevelOptions = [
    {
      value: '',
      text: '不限'
    },
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

  // 合伙人申请状态选项组
  public static partnerApplyStatusOptions = [
    {
      value: '',
      text: '不限'
    },
    {
      value: '0',
      text: '待审核'
    },
    {
      value: '1',
      text: '通过'
    },
    {
      value: '-1',
      text: '审核不通过'
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

}
