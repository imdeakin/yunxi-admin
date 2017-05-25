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
          link: '/youka-taocan',
          active: true
        },
        {
          title: '油卡绑定列表',
          link: '/youka-bind'
        },
        {
          title: '油卡购买套餐的订单管理',
          link: '/youka-order'
        },
        {
          title: '到账记录',
          link: '/youka-record'
        }
      ]
    },
    {
      title: '违章管理',
      items: [
        {
          title: '违章管理列表',
          link: '/weizhang'
        },
        {
          title: '办理违章',
          link: '/weizhang'
        },
        {
          title: '线下办理订单',
          link: '/weizhang'
        }
      ]
    },
    {
      title: '车险管理',
      items: [
        {
          title: '车险办理',
          link: '/weizhang'
        },
        {
          title: '车险信息',
          link: '/weizhang'
        },
        {
          title: '业务管理',
          link: '/weizhang'
        }
      ]
    },
    {
      title: '会员管理',
      items: [
        {
          title: '会员列表',
          link: '/user-list'
        },
        {
          title: '会员升级记录表',
          link: '/user-record'
        },
        {
          title: '会员升级订单表',
          link: '/uplevel-order'
        },
        {
          title: '推介关系',
          link: '/relation-list'
        }
      ]
    },
    {
      title: '合伙人管理',
      items: [
        {
          title: '合伙人管理',
          link: '/partner-list'
        },
        {
          title: '合伙人申请表',
          link: '/partner-apply-list'
        }
      ]
    },
    {
      title: '商城管理',
      items: [
        {
          title: '订单管理',
          link: '/goods-list'
        },
        {
          title: '优惠促销',
          link: '/goods-list'
        },
        {
          title: '优惠券',
          link: '/goods-list'
        },
        {
          title: '评论管理',
          link: '/goods-list'
        }
      ]
    },
    {
      title: '门店管理',
      items: [
        {
          title: '订单管理',
          link: '/weizhang'
        },
        {
          title: '优惠促销',
          link: '/weizhang'
        },
        {
          title: '优惠券',
          link: '/weizhang'
        },
        {
          title: '评论管理',
          link: '/weizhang'
        },
        {
          title: '门户信息',
          link: '/weizhang'
        }
      ]
    },
    {
      title: '广告',
      items: [
        {
          title: '广告编辑',
          link: '/weizhang'
        }
      ]
    },
    {
      title: '财务管理',
      items: [
        {
          title: '奖金明细',
          items: [
            {
              title: '会员奖金明细',
              link: '/weizhang'
            },
            {
              title: '合伙人奖金明细',
              link: '/weizhang'
            },
            {
              title: '奖金生成列表',
              link: '/weizhang'
            }
          ]
        },
        {
          title: '待核验订单',
          link: '/weizhang'
        },
        {
          title: '提现列表',
          link: '/weizhang'
        },
        {
          title: '充值列表',
          link: '/weizhang'
        },
        {
          title: '商城收益明细',
          link: '/weizhang'
        },
        {
          title: '门店收益明细',
          link: '/weizhang'
        }
      ]
    },
    {
      title: '消息中心',
      items: [
        {
          title: '消息管理',
          items: [
            {
              title: '添加消息',
              link: '/weizhang'
            },
            {
              title: '修改消息',
              link: '/weizhang'
            }
          ]
        },
        {
          title: '意见反馈',
          items: [
            {
              title: '意见反馈回复',
              link: '/weizhang'
            }
          ]
        }
      ]
    },
    {
      title: '系统设置',
      items: [
        {
          title: '管理员',
          link: '/weizhang'
        },
        {
          title: '角色管理',
          link: '/weizhang'
        },
        {
          title: '服务分类',
          link: '/weizhang'
        },
        {
          title: '商品分类',
          link: '/weizhang'
        },
        {
          title: '文案分类',
          link: '/weizhang'
        },
        {
          title: '操作日志',
          link: '/weizhang'
        }
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
        if (link === curLink || (item['items'] && this.resetNavStatus(item, curLink))) {
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
