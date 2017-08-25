/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {SystemFunction} from '../data-type/system-function';
import {CarSeriesList} from '../data-type/car-series-list';

declare let layer: any;

@Component({
  selector: 'role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css']
})
export class RoleManageMentComponent implements OnInit {
  public title = '角色管理';
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public tableList = [];
  public roleName = '';
  public roleList = [];
  public checkList = [];
  public filterData = {
    roleName: '',
  };
  public carBrandOptions;

  public systemFunction = SystemFunction;

  // 模态窗
  public modalShow: boolean = false;
  public modalData = {
    name:'',
    role_id:''
  };

  //增加窗
  public modalRoleShow:boolean = false;
  public modalRemoveRoleShow:boolean =false;

  constructor(private elRef: ElementRef,
              private apiCall: ApiCall,
              private funcServer: FuncServer,
              public cityPickerServer: CityPickerServer) {
  }

  public ngOnInit(): void {
    this.computeOnResize();
    this.getRoleList();

  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
  }

  public getRoleList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getRoleList(this.filterData.roleName, this.curPageIndex, this.perPageSize, (list, total) => {
      this.tableList = list;
      this.total = total;
    });
  }

  /**
   * 增加
   */
  public addRole():void{
    this.apiCall.addRole(this.modalData.name,(data) => {
        this.getRoleList();
        this.toggleModal();
    })
  }

   /**
   * 更改
   */
  public updateRole():void{
    this.apiCall.updateRole(this.modalData.role_id,this.modalData.name,(data) => {
      this.getRoleList();
      this.toggleModal();
    })
  }

  
   /**
   * 删除
   */
  public removeRole(roleId):void{
    this.apiCall.removeRole(roleId,(data) => {
      this.getRoleList();
    })
  }

  // 增加窗
  public toggleModal(item?): void {
    this.modalShow = !this.modalShow;
    if(item){
      this.modalData = {
        name:item.name,
        role_id:item.role_id
      }
    }
    if(!this.modalShow){
      this.modalData = {
        name:'',
        role_id:''
      }
    }
 }

 public modalSubmit():void{
    if(this.modalData.role_id){
      this.updateRole();
    }else{
      this.addRole()
    }
 }

   //确认弹窗
  public verificationConfirm(item): void {
    let index = layer.confirm(
      '请确认删除结果',
      {
        title: '确认',
        btn: ["确认", "取消"]
      },
      () => {
        this.removeRole(item.role_id);
        layer.close(index);
      },
      () => {
         layer.close(index);
      }
    )
  }

  public toggleRoleModal(item?):void{
    if(item){
      this.modalData = item;
    }
    this.modalRoleShow = !this.modalRoleShow;
    if(!this.modalRoleShow){
      this.roleList = [];
      this.checkList = [];
      this.modalData = {
        name:'',
        role_id:''
      }
    }
  }

  public toggleRemoveRoleModal(item?):void{
    if(item){
      this.modalData = item
    }
    this.modalRemoveRoleShow = !this.modalRemoveRoleShow;
    if(!this.modalRoleShow){
      this.roleList = [];
      this.checkList = [];
      this.modalData = {
        name:'',
        role_id:''
      }
    }
  }
}