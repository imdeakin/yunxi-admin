/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component} from '@angular/core';

@Component({
  selector: 'accordion-nav',
  templateUrl: './accordion-nav.component.html',
  styleUrls: ['./accordion-nav.component.css']
})
export class AccordionNavComponent {
  public navList = [
    {
      title: '油卡管理',
      active: true,
      items: [
        {
          title: '油卡套餐',
          active: true,
          items: [
            {
              title: '购买',
              link: '/weizhang',
              active: true
            }
          ]
        },
        {
          title: '油卡绑定列表',
          link: '/weizhang'
        },
        {
          title: '油卡充值管理',
          link: '/weizhang'
        }
      ]
    },
    {
      title: '车险推荐管理',
      items: [
        {
          title: '车险办理',
          link: '/weizhang'
        },
        {
          title: '车险信息',
          link: '/weizhang'
        }
      ]
    },
    {
      title: '车险管理',
      items: [
        {
          title: '线下',
          link: '/weizhang'
        },
        {
          title: '线上',
          link: '/weizhang'
        }
      ]
    },
    {
      title: '会员升级列表',
      items: [
        {
          title: '会员列表',
          link: '/weizhang'
        },
        {
          title: '会员关系',
          link: '/weizhang'
        }
      ]
    },
    {
      title: '合伙人管理',
      items: [
        {
          title: '合伙人申请',
          link: '/weizhang'
        }
      ]
    },
    {
      title: '商城管理',
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
          title: '优惠券',
          link: '/weizhang'
        },
        {
          title: '幻灯片',
          link: '/weizhang'
        },
        {
          title: '链接',
          link: '/weizhang'
        }
      ]
    },
    {
      title: '文案管理',
      items: [
        {
          title: '协议',
          link: '/weizhang'
        },
        {
          title: '公告',
          link: '/weizhang'
        },
        {
          title: '会员服务说明',
          link: '/weizhang'
        }
      ]
    },
    {
      title: '财务管理',
      items: []
    },
    {
      title: '消息中心',
      items: [
        {
          title: '订单提醒',
          link: '/weizhang'
        },
        {
          title: '意见反馈',
          link: '/weizhang'
        },
        {
          title: '留言',
          link: '/weizhang'
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

  public toggleNavItem(item): void {
    item.active = !item.active;
  }

  public getSubConHeight(navItem, subItem?) {
    let itemHeight = 36;
    if (subItem) {
      return subItem['active'] ? subItem['items'].length * itemHeight + 'px' : 0;
    } else if (navItem['active']) {
      let items = navItem['items'];
      let height = items.length * itemHeight;
      for (let i = 0, len = items.length; i < len; i++) {
        let item = items[i];
        if (item['items'] && item['items'].length && item['active']) {
          height += item['items'].length * itemHeight;
        }
        return height + 'px';
      }
    } else {
      return 0;
    }
  }
}
