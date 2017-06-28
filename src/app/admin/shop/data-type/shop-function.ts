/**
 * Created by Deakin on 2017/5/16 0016.
 */
export class ShopFunction {
  // 门店状态选项组
  public static shopStatusOptions = [
    {
      value: '1',
      text: '待审核'
    },
    {
      value: '2',
      text: '不通过'
    },
    {
      value: '3',
      text: '通过'
    }
  ];

  // 门店服务状态选项组
  public static shopServerStatusOptions = [
    {
      value: '0',
      text: '已下架'
    },
    {
      value: '1',
      text: '上架中'
    }
  ];

<<<<<<< HEAD
  // 门店申请状态
  public static getShopApplyStatusText(code: number): string {
    let text: string;
    switch (code) {
      case 1:
        text = '待审核';
        break;
      case 2:
        text = '不通过';
        break;
      case 3:
        text = '通过';
        break;
      default:
        text = '未知'
    }
    return text;
  }

=======
>>>>>>> e2948d7efceeaa4629064881b80a903be0537081
  // 门店状态
  public static getShopStatusText(code: number): string {
    let text: string;
    switch (code) {
      case 1:
        text = '待审核';
        break;
      case 2:
        text = '不通过';
        break;
      case 3:
        text = '通过';
        break;
      default:
        text = '未知'
    }
    return text;
  }

  // 门店服务状态
  public static getShopServerStatusText(code: number): string {
    let text: string;
    switch (code) {
      case 0:
        text = '已下架';
        break;
      case 1:
        text = '上架中';
        break;
      default:
        text = '未知'
    }
    return text;
  }
}
