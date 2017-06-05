/**
 * Created by Deakin on 2017/5/8 0008.
 */
import { Component, Input, OnInit } from '@angular/core';


@Component({
    selector: 'bar-graph',
    templateUrl: './bar-graph.component.html',
    styleUrls: ['./bar-graph.component.css']
})
export class BarGraphPageComponent implements OnInit {
    @Input() public salesInfo;
    public lineNum = 6;
    public maxCount = 2000;

    public ngOnInit(): void {
        console.log(this.salesInfo);
    }
}
