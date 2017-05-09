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
                    title: '线下'
                },
                {
                    title: '线上'
                }
            ]
        },
        {
            title: '违章管理',
            active: true,
            items: [
                {
                    title: '线下'
                },
                {
                    title: '线上',
                    active: true
                }
            ]
        },
        {
            title: '车险管理',
            items: [
                {
                    title: '线下'
                },
                {
                    title: '线上'
                }
            ]
        }
    ];

    public toggleNavItem(navItem): void {
        navItem.active = !navItem.active;
    }

    public getSubConHeight(navItem) {
        return navItem['active'] ? navItem['items'].length * 36 + 'px' : 0;
    }
}
