/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {SystemFunction} from '../data-type/system-function';
import {AdminList} from '../data-type/admin-list';

@Component({
  selector: 'admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {
  public title = '管理员';
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 0;
  public tableList: AdminList[];
  public filterData = {
    roleName: ''
  };
  public roleOptions;

  public systemFunction = SystemFunction;

  // 模态窗
  public modalShow: boolean = false;
  public modalData = {
    adminId: '',
    adminName: '',
    roleId: '',
    roleName: '',
    psw: '',
    psw1: ''
  };

  constructor(private elRef: ElementRef,
              private apiCall: ApiCall,
              private funcServer: FuncServer,
              public cityPickerServer: CityPickerServer) {
  }

  public ngOnInit(): void {
    this.computeOnResize();
    this.getAdminList();
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

  public getAdminList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getAdminList(this.filterData.roleName, this.curPageIndex, this.perPageSize, (list, total) => {
      this.tableList = list;
      this.total = total;
    });
  }

  public getRoleList(): void {
    this.apiCall.getRoleList(
      '',
      '',
      '',
      (list) => {
        let options = [];
        for (let i = 0, len = list.length; i < len; i++) {
          options.push({
            value: list[i].role_id,
            text: list[i].name
          });
          this.roleOptions = options;
        }
      });
  }

  // 模态窗
  public toggleModal(item?): void {
    if (item) {
      this.modalData.adminId = item.admin_id;
      this.modalData.roleName = item.role;
      this.modalData = {
        adminId: item.admin,
        adminName: item.name,
        roleId: '',
        roleName: item.role,
        psw: '',
        psw1: ''
      }
    }
    this.modalShow = !this.modalShow;

    if (!this.modalShow) {
      this.modalData = {
        adminId: '',
        adminName: '',
        roleId: '',
        roleName: '',
        psw: '',
        psw1: ''
      }
    }
  }

  public updateAdmin(): void {
    this.apiCall.updateAdmin(
      this.modalData.adminId,
      this.modalData.roleId,
      this.modalData.psw,
      (data) => {
        this.toggleModal();
        this.getAdminList(1);
      }
    );
  }

  public addAdmin(): void {
    this.apiCall.addAdmin(
      this.modalData.roleId,
      this.modalData.adminName,
      this.modalData.psw,
      (data) => {
        this.toggleModal();
        this.getAdminList(1);
      }
    );
  }

  public removeAdmin(adminId): void {
    this.apiCall.removeAdmin(
      adminId,
      (data) => {
        this.getAdminList(1);
      }
    );
  }

  public modalSubmit(): void {
    if (this.modalData.adminId) {
      this.updateAdmin();
    } else {
      this.addAdmin();
    }
  }
}
