/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {User} from '../data-type/user';
import {UsersFunction} from '../data-type/users-function';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public title = '会员列表';
  public contentHeight = 0;
  public total = 0;
  public type = '1';
  public userId:string;
  public perPageSize = 1;
  public curPageIndex = 1;
  public tableList: User[];
  public yearOptions;
  public totalData = {

  };
  public filterData = {
    mobile: '',
    level: '',
    regionId: ''
  };

  public detaData ={
    years:'',
    months:''
  }
  public usersFunction = UsersFunction;

  // 模态窗
  public modalShow: boolean = false;
  public modalSpreadShow:boolean = false;
  public YearMonthsShow:boolean = false;
  public modalData;

  constructor(private elRef: ElementRef, private apiCall: ApiCall, public funcServer: FuncServer, public cityPickerServer: CityPickerServer) {
  }

  public ngOnInit(): void {
    this.computeOnResize();
    this.getUserList(); 
    this.yearOptions = this.usersFunction.chooseYearOptions()
  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
  }

  public getUserList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getUserList(this.filterData.mobile, this.filterData.level, this.filterData.regionId, this.curPageIndex, this.perPageSize, (list, total) => {
      this.tableList = list;
      console.log(list);
      this.total = total;
    });
  }

  public getUserInfo(memberId):void {
    this.apiCall.getUserInfo(memberId, (data) => {
        this.modalData = data;
        console.log(data);
    });
  }

  public getStatisticsData():void{
      this.apiCall.getStatisticsData(this.userId,this.type,this.detaData.years,this.detaData.months,(data)=>{
          this.totalData = data;
          console.log(this.totalData); 
      })
  }

  // 模态窗
  public toggleModal(item?): void {
    if (item) {
      this.getUserInfo(item.member_id);
    }
    this.modalShow = !this.modalShow;

    if (!this.modalShow) {
      this.modalData = null;
    }
  }

  public modalSubmit(): void{
    if(this.modalData.member_id){
        this.apiCall.updateMemberInfo(this.modalData.member_id,this.modalData.member_level_id,(data)=>{
          this.toggleModal();
          this.getUserList(1);
        })
    }
  }
  //选择类型请求
  public toggleTypeModal(user_id?,num?):void{
      this.userId = user_id;
      this.type = num;
      if(this.userId){
        this.getStatisticsData();
      }
      if(num !==4){
        this.YearMonthsShow = false;
        this.detaData ={
          years:'',
          months:'',
        }
      }

  }
  
  //推广弹窗
  public toggleSpreadModal(user_id?,num?):void{
      this.userId = user_id;
      this.type = num;
      if(this.userId){
        this.getStatisticsData();
      }
      this.modalSpreadShow = !this.modalSpreadShow;
      if(!this.modalSpreadShow){
        this.userId = '';
        this.totalData = {
          one_vip1:'',
          one_vip2:'',
          one_vip3:'',
          two_vip1:'',
          two_vip2:'',
          two_vip3:'',
          three_vip1:'',
          three_vip2:'',
          three_vip3:''
        }
      }
  }
}
