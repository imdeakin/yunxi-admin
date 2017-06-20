/**
 * Created by Deakin on 2017/5/16 0016.
 */
export class YoukaFunction {
  //油卡搜索类型

  public static youkaSelectOptions = [
    {
      value:'oilCard',
      text:'油卡账号'
    },
    {
      value:'mobile',
      text:'手机账号'
    },
    {
      value:'userName',
      text:'用户名'
    },
  ]

  //油卡套餐类型
  public static youkaTaocanClassifyOptions = [
    {
      value:'1',
      text:'套餐充值'
    },
    {
      value:'2',
      text:'即时到账'
    }
  ]
  // 油卡套餐的优惠类型选项组
  public static youcaTaocanClassOptions = [
    {
      value: '1',
      text: '默认套餐'
    },
    {
      value: '2',
      text: '优惠活动'
    },
    {
      value: '3',
      text: '会员专享'
    }
  ];

  // 油卡类型选项组
  public static youcaTaocanTypeOptions = [
    {
      value: '0',
      text: ''
    },
    {
      value: '1',
      text: '中国石油'
    },
    {
      value: '2',
      text: '中国石化'
    }
  ];

  // 油卡交易方式选项组
  public static youcaTradeModeOptions = [
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
      text: '云付通'
    },
    {
      value: '3',
      text: '余额'
    }
  ];

  // 油卡套餐的优惠类型：1、默认套餐，2、优惠活动，3、会员专享
  public static getYoucaTaocanClassText(classify: number): string {
    let text: string;
    switch (classify) {
      case 1:
        text = '默认套餐';
        break;
      case 2:
        text = '优惠活动';
        break;
      case 3:
        text = '会员专享';
        break;
      default:
        text = '未知'
    }
    return text;
  }

  // 油卡套餐的支付类型 1、分期到账，2、即时到账充值
  public static getYoukaTaocanPayTypeText(type: number): string {
    let text: string;
    switch (type) {
      case 1:
        text = '分期到账';
        break;
      case 2:
        text = '即时到账充值';
        break;
      default:
        text = '未知'
    }
    return text;
  }

  // 油卡类型 1:中国石油 2:中国石化 （类型）
  public static getYoukaTypeText(type: number): string {
    let text: string;
    switch (type) {
      case 0:
        text = '';
        break;
      case 1:
        text = '中国石油';
        break;
      case 2:
        text = '中国石化';
        break;
      default:
        text = ''
    }
    return text;
  }

  // 油卡订单状态 0待审核，1待返还(订单已充值成功，待返还)，2不予充值，-1加入购物车，3取消，4删除，5 已完成(订单返还结束)，6 待支付
  public static getYoukaOrderStatus(status: number): string {
    let text: string;
    switch (status) {
      case 0:
        text = '待审核';
        break;
      case 1:
        text = '待返还';
        break;
      case 2:
        text = '不予充值';
        break;
      case 3:
        text = '取消';
        break;
      case 4:
        text = '删除';
        break;
      case 5:
        text = '已完成';
        break;
      case 6:
        text = '待支付';
        break;
      default:
        text = '加入购物车'
    }
    return text;
  }

  // 是否默认 1、是，0、否
  public static getDefaultText(is_default: number): string {
    let text: string;
    switch (is_default) {
      case 1:
        text = '是';
        break;
      default:
        text = '否'
    }
    return text;
  }

  //交易方式
    public static getYoukaPayStyle(is_payStyle: number): string {
    let text: string;
     switch(is_payStyle){
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
    }
    return text;
  }
  
}
