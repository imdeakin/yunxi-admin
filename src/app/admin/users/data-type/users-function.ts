/**
 * Created by Deakin on 2017/5/16 0016.
 */
export class UsersFunction {
  // 会员等级选项组
  public static userLevelOptions = [
    {
      value: '1',
      text: '普通会员'
    },
    {
      value: '2',
      text: 'VIP会员'
    },
    {
      value: '3',
      text: '钻石会员'
    }
  ];

  public static MonthOptions = [
    {
      value:'1',
      text:'1',
    },
     {
      value:'2',
      text:'2',
    }, {
      value:'3',
      text:'3',
    }, {
      value:'4',
      text:'4',
    }, {
      value:'5',
      text:'5',
    }, {
      value:'6',
      text:'6',
    }, {
      value:'7',
      text:'7',
    }, {
      value:'8',
      text:'8',
    }, {
      value:'9',
      text:'9',
    },
    {
      value:'10',
      text:'10',
    },
    {
      value:'11',
      text:'11',
    },
    {
      value:'12',
      text:'12',
    }
  ]

  // 会员升级订单状态选项组
  public static uplevelOrderStatusOptions = [
    {
      value: '-2',
      text: '取消升级'
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

  // 会员等级
  public static getUserLevelText(classify: number): string {
    let text: string;
    switch (classify) {
      case 1:
        text = '普通会员';
        break;
      case 2:
        text = 'VIP会员';
        break;
      case 3:
        text = '钻石会员';
        break;
      default:
        text = '未知'
    }
    return text;
  }

  // 会员升级订单状态 0、待支付，1、成功，-1、失败 ，-2、取消升级
  public static getUpLevelOrderStatusText(classify: number): string {
    let text: string;
    switch (classify) {
      case -2:
        text = '取消升级';
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
  public static chooseYearOptions():any{
      let yearOptions = [];
      let num = 30;
      let date = new Date();
      let year = date.getFullYear();
      for (let i = year - num ;i<=year;i++){
        yearOptions.unshift({
          value:i,
          text:i,
        })
      }
      console.log(yearOptions);
      return yearOptions
  }
}
