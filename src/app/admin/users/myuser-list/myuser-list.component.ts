/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {User} from '../data-type/user';
import {UsersFunction} from '../data-type/users-function';

import 'rxjs/add/operator/map';

declare var $:any;

@Component({
  selector: 'myuser-list',
  templateUrl: './myuser-list.component.html',
  styleUrls: ['./myuser-list.component.css']
})
export class myUserListComponent implements OnInit {
  public title = '会员列表';
  public contentHeight = 0;
  public total = 0;
  public type = '1';
  public userId:string;
  public perPageSize = 1;
  public curPageIndex = 1;
  public tableList;
  public memberId;

  public usersFunction = UsersFunction;

  // 模态窗
  public modalShow: boolean = false;

  public filterData ={
      level:'',
      memberLevel:''
  }
  constructor(private elRef: ElementRef, 
              private apiCall: ApiCall, 
              public funcServer: FuncServer, 
              public cityPickerServer: CityPickerServer,
              private router:Router,
              private activatedRoute:ActivatedRoute) {
  }

  public ngOnInit(): void {
     // 获取路由参数
    this.activatedRoute.params
      .map((params: Params) => params['memberId'])
      .subscribe((memberId:string) => {
        this.memberId = memberId;
      });
      this.getMyMemberList(1);
      this.computeOnResize();
  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
  }

  public getMyMemberList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getMyMemberList(this.memberId, this.filterData.level, this.filterData.memberLevel, this.curPageIndex, this.perPageSize, (list, total) => {
      this.tableList = list;
      console.log(this.tableList);
      this.total = total;
    });
  }


  // 模态窗
  // public toggleModal(item?): void {
  //   if (item) {
  //     this.getUserInfo(item.member_id);
  //   }
  //   this.modalShow = !this.modalShow;
  //   if (!this.modalShow) {
  //     this.modalData = null;
  //     this.totalData = null;
  //   }
  // }

  // public modalSubmit(): void{
  //   if(this.modalData.member_id){
  //       this.apiCall.updateMemberInfo(this.modalData.member_id,this.modalData.member_level_id,(data)=>{
  //         this.toggleModal();
  //         this.getUserList(1);
  //       })
  //   }
  
}
