/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {User} from '../data-type/user';
import {UsersFunction} from '../data-type/users-function';
import { AdminFunc } from '../../../serv/admin.server';


declare var $:any;

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
  public password;
  public date;
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

  // 日期时间
  private selDate: string = '';
  private minDate: string = '1970/01/01';
  private maxDate: string = '9999/12/31';
  private disableDays: number[] = [0, 6];    //For Sunday and Saturday
  private toContainPrevMonth: boolean = false;
  private toContainNextMonth: boolean = false;
  private value: string = '';
  public setInputDate(event) {
    this.value = event.target.value;
  }
  public setDate(date) {
    this.selDate = date;
  }

  // 模态窗
  public modalShow: boolean = false;
  public modalSpreadShow:boolean = false;
  public YearMonthsShow:boolean = false;
  public rechargeShow:boolean = false;
  public gradeShow:boolean = false;
  public priceShow:boolean = false;
  public modalData;
  public totalData;
  public rechargeData = {
    balance:'',
    points:''
  };
  public rechargeModal = {
    adminId:'',
    userId:'',
    quota:0,
    type:0,
    change:'',
    described:''
  };
  // public banModal ={
  //   forbiddenTime:'',
  //   reason:''
  // }

  constructor(private elRef: ElementRef,
              private apiCall: ApiCall,
              public funcServer: FuncServer,
              public cityPickerServer: CityPickerServer,
              private adminFunc:AdminFunc) {
  }

  public ngOnInit(): void {
    this.computeOnResize();
    this.getUserList();
    this.jqActive();
    this.yearOptions = this.usersFunction.chooseYearOptions();
  }

  public jqActive():void{
     $(function(){
      $("#rechargeButton").children().click(function(){
          $("#rechargeButton").children().removeClass("active-btn");
              $(this).addClass("active-btn");
      })

       $("#spreadButton").children().click(function(){
          $("#spreadButton").children().removeClass("active-btn");
              $(this).addClass("active-btn");
      })
    })
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
      console.log(this.tableList);
      this.total = total;
    });
  }

  public getUserInfo(memberId):void {
    this.apiCall.getUserInfo(memberId, (data) => {
        this.modalData = data;
    });
  }

  public getStatisticsData():void{
      this.apiCall.getStatisticsData(this.userId,this.type,this.detaData.years,this.detaData.months,(data)=>{
          this.totalData = data;
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
      this.totalData = null;
    }
  }

  public updateMemberInfo(){
       this.apiCall.updateMemberInfo(this.modalData.member_id,this.modalData.member_level_id,(data)=>{
          this.toggleModal();
          this.getUserList(1);
        })
  }

  public modalSubmit(): void{
    if(this.modalData.member_id){
        this.updateMemberInfo();
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
        this.totalData = null;
      }
  }

  //解除禁用会员
  // public banOrRecoveryMember(item,status?):void{
  //   this.apiCall.banOrRecoveryMember(item.memberId,status,for)
  // }

  public getCurrQuota(item):void{
    let memberId = item.member_id;
    this.rechargeModal.userId = item.user_id;
    this.apiCall.getCurrQuota(memberId,(data)=>{
        this.rechargeData = data;
        this.changeRechargeType(1);
    })
  }

  public recharge():void{
      let adminId = this.adminFunc.getAdminId();
      this.apiCall.manualCharge(adminId,this.rechargeModal.userId,this.rechargeModal.quota,this.rechargeModal.type,this.rechargeModal.change,this.rechargeModal.described,(data)=>{
          this.toggleRecharge();
          this.getUserList(1);
      });
  }

  //充值弹窗
  public toggleRecharge(item?):void{
      if(item){
         this.getCurrQuota(item);
      }else{
         this.rechargeData = {
            balance:'',
            points:''
       }
          this.rechargeModal ={
               adminId:'',
               userId:'',
               quota:0,
               type:0,
               change:'',
               described:''
        }
      }
      this.rechargeShow = !this.rechargeShow;
  }

  //清空recharge弹窗数据
  public cleanRechargeModal():void{
       this.rechargeModal.quota = 0;
       this.rechargeModal.type = 0;
       this.rechargeModal.change = '';
       this.rechargeModal.described = '';
  }

  public changeRechargeType(numType?):void{
      if(numType){
          switch(numType){
          case 1:
            this.rechargeModal.type = 1;
            this.priceShow = false;
            this.gradeShow = true;
          break;
          case 2:
            this.rechargeModal.type = 2;
            this.priceShow = true;
            this.gradeShow = false;
          break;
          default:
            this.priceShow = false;
            this.gradeShow = true;
        }
      }else{
        this. cleanRechargeModal();
      }
  }
}
