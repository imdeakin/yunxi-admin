/**
 * Created by Administrator on 2017/6/5.
 */
import {Component, OnInit} from '@angular/core';

@Component({
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.css']
})
export class AdminComponent implements OnInit {
  public contentHeight = 0;
  public mainWidth = 0;

  public ngOnInit(): void {
    this.mainWidth = window.innerWidth - 300;
    this.contentHeight = window.innerHeight - 83;
    window.addEventListener('resize', (e) => {
      console.log('resize');
      this.mainWidth = window.innerWidth - 300;
      this.contentHeight = window.innerHeight - 83;
    })
  }
}
