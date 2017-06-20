/**
 * Created by Kun on 2017/6/20 .
 */

export class weiZhangFunction{
    //违章状态
    public static weizhangStaticOptions =[
        {
            value:'-2',
            text:'代受理'
        },
        {
            value:'0',
            text:'待支付'
        },
        {
            value:'1',
            text:'已支付'
        },
        {
            value:'2',
            text:'已退单'
        },
        {
            value:'3',
            text:'待验证'
        },
        {
            value:'4',
            text:'受理中'
        },
        {
            value:'5',
            text:'已完成'
        },
        {
            value:'6',
            text:'已失效'
        }
    ]

    // 违章状态的类型-2、不可办理=显示“代办理”0、待支付 =显示“待支付”1、已支付=2、已退单3、待验证(待确认)4、受理中5、已完成6、已失效
  public static getweiZhangListText(status: number): string {
    let text: string;
    switch (status) {
      case -2:
        text = '代受理';
        break;
      case 0:
        text = '待支付';
        break;
      case 1:
        text = '已支付';
        break;
      case 2:
        text = '已退单';
        break;
      case 3:
        text = '待验证';
        break;
      case 4:
        text = '受理中';
        break;
      case 5:
        text = '已完成';
        break;
      case 6:
        text = '已失效';
        break;
      default:
        text = '未知'
    }
    return text;
  }

  //车行易保存订单状态
  public static getweiZhanghandleStatusText(handle_status: number): string {
    let text: string;
    switch (handle_status) {
      case 0:
        text = '车行易生成订单成功';
        break;
      case 10100:
        text = '未被授权访接口';
        break;
      case 10101:
        text = '车牌号格式错误';
        break;
      case 10102:
        text = '反序列化记录失败';
        break;
      case 10103:
        text = '无此记录';
        break;
      case 10104:
        text = '下单车牌与下单记录车牌不一致';
        break;
      case 10105:
        text = '存在已办理记录';
        break;
      case 10106:
        text = '车架号和发动机号都不符合下单规则';
        break;
      case 10107:
        text = '车架号不符合下单规则';
        break;
      case 10107:
        text = '车架号和发动机号都不符合下单规则';
        break;
      case 10108:
        text='发动机号不符合下单规则';
        break;
      case 10109:
        text='存在不可办理数据，请重新查询';
        break;
      case 10120:
        text='生成订单失败';
        break;
      case 500:
        text ='生成订单异常';
        break;
      default:
        text = '未知'
    }
    return text;
  }

   //车行易保存订单状态
  public static getweiZhangCxyPayStatusText(cxy_pay_status: number): string {
    let text: string;
    switch (cxy_pay_status) {
      case 0:
        text = '支付订单成功';
        break;
      case 11:
        text = '预付卡账户不存在/无权使用/余额不足/支付失败';
        break;
      case 14:
        text = '支付订单发生异常';
        break;
      case 15:
        text = '未找到该订单号对应的订单明细或您无权访问该订单,请确认是否已支付';
        break;
      case 16:
        text = '您的订单已过期,无法完成支付（有效期3天）';
        break;
      default:
        text = '未知'
    }
    return text;
  }
}