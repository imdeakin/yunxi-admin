/**
 * Created by Deakin on 2017/5/16 0016.
 */
export class SystemFunction {
  // 角色选项组
  public static roleOptions = [
    {
      value: '0',
      text: '客服'
    },
    {
      value: '1',
      text: '主管'
    },
    {
      value: '2',
      text: '高管'
    }
  ];

  // 方案类型选项组
  public static articleTypeOptions = [
    {
      value: '1',
      text: '云洗协议'
    },
    {
      value: '2',
      text: '文案'
    }
  ];

  // 角色
  public static getRoleText(code: number): string {
    let text: string;
    switch (code) {
      case 0:
        text = '客服';
        break;
      case 1:
        text = '主管';
        break;
      case 2:
        text = '高管';
        break;
      default:
        text = '未知'
    }
    return text;
  }

  // 方案类型
  public static getArticleTypeText(code: number): string {
    let text: string;
    switch (code) {
      case 0:
        text = '合同';
        break;
      case 1:
        text = '协议';
        break;
      default:
        text = '未知'
    }
    return text;
  }
}
