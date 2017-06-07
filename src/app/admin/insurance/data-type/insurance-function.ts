/**
 * Created by Administrator on 2017/6/7.
 */
export class InsuranceFunction {
  public static insuranceOrderStatusOptions = [
    {
      value: '-1',
      text: '加入购物车'
    },
    {
      value: '2',
      text: '核保失败'
    },
    {
      value: '3',
      text: '核保成功待支付'
    },
    {
      value: '4',
      text: '等待核保结果'
    },
    {
      value: '5',
      text: '已支付'
    },
    {
      value: '6',
      text: '受理中'
    },
    {
      value: '7',
      text: '承保成功'
    },
    {
      value: '8',
      text: '算价失败'
    },
    {
      value: '9',
      text: '待验证'
    }
  ];

  public static insuranceOrderFilterTypeOptions = [
    {
      value: '0',
      text: '流水号'
    },
    {
      value: '1',
      text: '智通引擎业务号'
    },
    {
      value: '2',
      text: '用户'
    },
    {
      value: '3',
      text: '车主姓名'
    },
    {
      value: '4',
      text: '车主手机号'
    },
    {
      value: '5',
      text: '车主身份证'
    }
  ];

  public static getInsuranceOrderStatusText(code: number): string {
    let text = '';
    switch (code) {
      case -1:
        text = '加入购物车';
        break;
      case 2:
        text = '核保失败';
        break;
      case 3:
        text = '核保成功待支付';
        break;
      case 4:
        text = '等待核保结果';
        break;
      case 5:
        text = '已支付';
        break;
      case 6:
        text = '受理中';
        break;
      case 7:
        text = '承保成功';
        break;
      case 8:
        text = '算价失败';
        break;
      case 9:
        text = '待验证';
        break;
      default:
        text = '未知'
    }
    return text;
  }
}
