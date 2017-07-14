/**
 * Created by Deakin on 2017/5/16 0016.
 */
export class AdFunction {
  // 广告位置选项组
  public static adPositionOptions = [
    {
      value: 'index',
      text: '首页轮播'
    },
    {
      value:'index-2',
      text:'首页广告'
    },
    {
      value: 'mall',
      text: '商城'
    },
    {
      value: 'store',
      text: '商埔'
    },
    {
      value: 'shoppingcart',
      text: '购物车'
    },
    {
      value: 'addGas',
      text: '加油'
    },
    {
      value: 'illegal',
      text: '违章'
    },
    {
      value: 'insurance',
      text: '车险'
    }
  ];

  // 广告业务选项组
  public static adBusinessOptions = [
    {
      value: '1',
      text: '门店'
    },
    {
      value: '2',
      text: '商城'
    }
  ];

  // 广告可见状态选项组
  public static adVisibleStatusOptions = [
    {
      value: '0',
      text: '不可见'
    },
    {
      value: '1',
      text: '可见'
    }
  ];

  // 广告位置
  public static getAdPositionText(code: string): string {
    let text: string;
    switch (code) {
      case 'index':
        text = '首页轮播';
        break;
      case 'index-2':
        text = '首页广告';
        break;
      case 'mall':
        text = '商城';
        break;
      case 'store':
        text = '商埔';
        break;
      case 'shoppingcart':
        text = '购物车';
        break;
      case 'addGas':
        text = '加油';
        break;
      case 'illegal':
        text = '违章';
        break;
      case 'insurance':
        text ='车险';
        break;
      default:
        text = '未知'
    }
    return text;
  }

  //  广告业务
  public static getAdBusinessText(code: number): string {
    let text: string;
    switch (code) {
      case 1:
        text = '门店';
        break;
      case 2:
        text = '商城';
        break;
      default:
        text = '未知'
    }
    return text;
  }

  // 广告可见状态
  public static getAdVisibleStatusText(code: number): string {
    let text: string;
    switch (code) {
      case 0:
        text = '不可见';
        break;
      case 1:
        text = '可见';
        break;
      default:
        text = '未知'
    }
    return text;
  }
}
