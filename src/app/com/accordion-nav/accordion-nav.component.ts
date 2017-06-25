/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Component({
  selector: 'accordion-nav',
  templateUrl: './accordion-nav.component.html',
  styleUrls: ['./accordion-nav.component.css']
})
export class AccordionNavComponent implements OnInit {
  public navList = [
    {
      title: '油卡管理',
      active: true,
      items: [
        {
          title: '油卡套餐',
          link: '/admin/youka-taocan',
          active: true
        },
        {
          title: '油卡绑定列表',
          link: '/admin/youka-bind'
        },
        {
          title: '油卡套餐订单',
          link: '/admin/youka-order'
        },
        {
          title: '油卡套餐到账管理',
          link: '/admin/youka-recordManage'
        },
        {
          title: '油卡套餐到账记录',
          link: '/admin/youka-record'
        }
      ]
    },
    {
      title: '违章管理',
      items: [
        {
          title: '可办理违章',
          link: '/admin/canweizhang'
        },
        {
          title: '不可办理违章',
          link: '/admin/cantweizhang'
        }
      ]
    },
    {
      title: '车险管理',
      items: [
        {
          title: '车险订单',
          link: '/admin/insurance-order-list'
        },
        {
          title: '推荐的保险公司',
          link: '/admin/car-protect-list'
        }
      ]
    },
    {
      title: '会员管理',
      items: [
        {
          title: '会员列表',
          link: '/admin/user-list'
        },
        {
          title: '会员升级记录表',
          link: '/admin/user-record'
        },
        {
          title: '会员升级订单表',
          link: '/admin/uplevel-order'
        },
        {
          title: '推介关系',
          link: '/admin/relation-list'
        }
      ]
    },
    {
      title: '合伙人管理',
      items: [
        {
          title: '合伙人管理',
          link: '/admin/partner-list'
        },
        {
          title: '合伙人申请表',
          link: '/admin/partner-apply-list'
        }
      ]
    },
    {
      title: '商城管理',
      items: [
        {
          title: '商品列表',
          link: '/admin/goods-list'
        },
        {
          title: '类型管理',
          link: '/admin/goods-type-list'
        },
        {
          title: '订单管理',
          link: '/admin/order-list'
        }
      ]
    },
    {
      title: '门店管理',
      items: [
        {
          title: '门店申请',
          link: '/admin/shop-apply-list'
        },
        {
          title: '门店列表',
          link: '/admin/shop-list'
        },
        {
          title: '门店服务',
          link: '/admin/shop-server-list'
        },
        {
          title: '门店订单',
          link: '/admin/shop-order-list'
        }
      ]
    },
    {
      title: '广告',
      link: '/admin/ad-list'
    },
    {
      title: '财务管理',
      items: [
        {
          title: '云付通核验',
          link: '/admin/cloudpay-verification-list'
        },
        {
          title: '云付通核验历史',
          link: '/admin/cloudpay-verification-history-list'
        },
        {
          title: '充值列表',
          link: '/admin/recharge-list'
        },
        {
          title: '奖金提现管理',
          link: '/admin/bonus-withdraw-list'
        }
      ]
    },
    {
      title: '消息中心',
      items: [
        {
          title: '消息管理',
          link: '/admin/msg-list'
        },
        {
          title: '意见反馈',
          link: '/admin/feedback-list'
        }
      ]
    },
    {
      title: '系统设置',
      items: [
        {
          title: '管理员',
          link: '/admin/admin-list'
        },
        {
          title: '方案管理',
          link: '/admin/article-list'
        },
        {
          title: '车系',
          link: '/admin/car-series-list'
        },
        // {
        //   title: '车型',
        //   link: '/admin/car-model-list'
        // },
        {
          title: '品牌',
          link: '/admin/car-brand-list'
        },
      ]
    }
  ];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    // 通用router事件 监听路径变化
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute) // 将filter处理后的Observable再次处理
      .subscribe((event) => {
        this.resetNavStatus({
          items: this.navList
        }, this.router.url);
      });
  }

  /**
   * 重置导航状态
   * @param navItem 导航列表
   * @param curLink 当前页路径
   * @returns {boolean} 返回当前层是否已激活
   */
  public resetNavStatus(navItem, curLink): boolean {
    let items = navItem['items'] || [];
    let curLevleActive = false;
    for (let i = 0, len = items.length; i < len; i++) {
      let item = items[i];
      let link = item['link'];
      if (!curLevleActive) {
        if (link && curLink.search(link) >= 0 || (item['items'] && this.resetNavStatus(item, curLink))) {
          item.active = true;
          curLevleActive = true;
        } else {
          item.active = false;
        }
      } else {
        item.active = false;
      }
    }
    return curLevleActive;
  }

  /**
   * 展开或收起的切换
   * @param navItem 可操作的菜单项
   */
  public toggleNavItem(navItem): void {
    navItem.active = !navItem.active;
  }

  /**
   * 计算子列表高度
   * @param navItem 导航项
   * @param subItem 子项 如果有传递 则表明是子菜单触发该方法
   * @returns {string|number}
   */
  public getSubConHeight(navItem, subItem?) {
    if (subItem) { // 当是子菜单触发时 只需要计算子菜单的高度
      return subItem['active'] ? subItem['items'].length * 36 + 'px' : 0;
    } else { // 当是导航项触发时 要先计算其内已展开的子菜单高度总合 再加上 导航的子列表高度 才是最终的高度
      let subItems = navItem['items'] || [];
      let height = subItems.length * 36;
      for (let i = 0, len = subItems.length; i < len; i++) {
        let subItem = subItems[i];
        if (subItem['active'] && subItem['items']) {
          height += subItem['items'].length * 36;
        }
      }
      return navItem['active'] ? height + 'px' : 0;
    }
  }
}
