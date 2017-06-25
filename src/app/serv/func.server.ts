/**
 * Created by Deakin on 2017/5/19 0019.
 */
import {Injectable, ElementRef} from '@angular/core'

Injectable()
export class FuncServer {

  /**
   * 计算更新内容高度
   */
  public getContentHeight(elRef: ElementRef): number {
    let height = elRef.nativeElement.firstChild.offsetHeight - 40;
    return height;
  }

  /**
   * 计算更新每页条数
   */
  public getPerPageSize(contentHeight: number): number {
    let itemHeight = 53;
    let maxHeight = contentHeight - 70 - 50 - 67;
    let size = Math.floor(maxHeight / itemHeight);
    let minSize = 1;
    let maxSize = 30;
    if (size < minSize) {
      size = minSize;
    } else if (size > maxSize) {
      size = maxSize;
    }
    return size;
  }

  // 对象深度复制
  public deepCopy(obj) {
    let result, oClass = this.isClass(obj);
    //确定result的类型
    if (oClass === "Object") {
      result = {};
    } else if (oClass === "Array") {
      result = [];
    } else {
      return obj;
    }
    for (let key in obj) {
      let copy = obj[key];
      if (this.isClass(copy) == "Object") {
        result[key] = arguments.callee(copy);//递归调用
      } else if (this.isClass(copy) == "Array") {
        result[key] = arguments.callee(copy);
      } else {
        result[key] = obj[key];
      }
    }
    return result;
  }

  //返回传递给他的任意对象的类
  public isClass(o) {
    if (o === null) return "Null";
    if (o === undefined) return "Undefined";
    return Object.prototype.toString.call(o).slice(8, -1);
  }

  // 支付方式选项组
  public payTypeOptions = [
    {
      value: '1',
      text: '支付宝'
    },
    {
      value: '2',
      text: '微信'
    },
    {
      value: '3',
      text: '云付通'
    },
    {
      value: '4',
      text: '余额'
    }
  ];

  // 订单状态 1、支付宝，2、微信，3、云付通，4、余额
  public getPayTypeText(type: number): string {
    let text: string;
    switch (type) {
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
      default:
        text = '未知'
    }
    return text;
  }

  // 支付方式选项组
  public sexOptions = [
    {
      value: '0',
      text: '女'
    },
    {
      value: '1',
      text: '男'
    }
  ];

  // 性别 0、女，1、男
  public getSexText(sex: number): string {
    let text: string;
    switch (sex) {
      case 0:
        text = '女';
        break;
      case 1:
        text = '男';
        break;
      default:
        text = '未知'
    }
    return text;
  }

  // 时间范围选项组
  public dateRangeOptions = [
    {
      value: '1',
      text: '今天'
    },
    {
      value: '2',
      text: '最近3天'
    },
    {
      value: '3',
      text: '最近7天'
    },
    {
      value: '4',
      text: '最近30天'
    }
  ];

  // 时间范围
  public getDateRangeText(sex: number): string {
    let text: string;
    switch (sex) {
      case 1:
        text = '今天';
        break;
      case 2:
        text = '最近3天';
        break;
      case 3:
        text = '最近7天';
        break;
      case 4:
        text = '最近30天';
        break;
      default:
        text = '未知'
    }
    return text;
  }
}


