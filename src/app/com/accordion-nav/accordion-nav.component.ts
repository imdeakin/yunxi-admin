/**
 * Created by Deakin on 2017/5/8 0008.
 */
import { Component } from '@angular/core';

@Component({
    selector: 'accordion-nav',
    templateUrl: './accordion-nav.component.html',
    styleUrls: ['./accordion-nav.component.css']
})
export class AccordionNavComponent {
    public navList = [
        {
            title: '油卡管理',
            items: [
                {
                    title: '油卡套餐',
                    items: [
                        {
                            title: '购买',
                            link: '/weizhang'
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
            let subItems = navItem['items'];
            let height = navItem['items'].length * 36;
            for (let i = 0, len = subItems.length; i < len; i++) {
                let subItem = subItems[i];
                if (subItem['active']) {
                    height += subItem['items'].length * 36;
                }
            }
            return navItem['active'] ? height + 'px' : 0;
        }
    }
}
