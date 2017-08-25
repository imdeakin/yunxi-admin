import { Component, Input, DoCheck, OnInit, ElementRef, Renderer} from '@angular/core';
import { ApiCall } from '../../http/api-call';
import { FuncServer } from '../../serv/func.server';


declare let layer: any;

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit,DoCheck{


  // 超简单, 重点: 接收上级的值
  // 可以为树建立一个接口, 这里简化为any
  @Input() public treelists: any = [];
  @Input() public checkedLists: any = [];
  @Input() public getRoleId:string = '';
  @Input() public isAllCheck:boolean; 
  @Input() public father:any = [];
  public allCheckOption = [];
  public oldTreelists;
  public oldIsAllCheck;
  public activeShowList = [];
  public oldRoleId = '';
  public roleList = [];
  public checkList;

  public fatherOption = [];
  public childOption = [];
  constructor(private apiCall:ApiCall,
              private funcServer:FuncServer,
              private elementRef:ElementRef,
              private renderer: Renderer){

  }

  public ngOnInit():void{
    this.roleAuthorityList();
  }

  public ngDoCheck():void{

  }

  //获取角色权限列表
  public roleAuthorityList():void{
      this.apiCall.roleAuthorityList(this.getRoleId,(data)=>{
        this.roleList =  this.funcServer.deepCopy(data.all_authority_list);
        this.checkList = this.mergeArray(data.all_authority_list,data.role_authority_list);
        console.log(this.checkList);
      })
  }

  public childText(allList,selfList):void{
    for(let i = 0; i < allList.length;i++){
      for(let n = 0; n< selfList.length;n++){
         if(allList[i].auth_tag === selfList[n].auth_tag){
              this.childOption.push(true);
              break;
            }else if(n === selfList.length - 1){
              this.childOption.push(false);
        }
      }
    }
  }

  //去重
  public mergeArray(arr1, arr2):any{ 
    // console.log(arr1,arr2);
    if(arr2.length > 0){
      for (let i = 0 ; i < arr1.length ; i ++ ){
        for(let j = 0 ; j < arr2.length ; j ++ ){
            if (arr1[i].authority_id === arr2[j].authority_id && arr2[j].role_auth_id){
               // arr1[i] = arr2[j];
              arr1[i].role_auth_id = arr2[j].role_auth_id;
              this.secondFor(arr1[i],arr2[j])
              break;
            }
            if(j == arr2.length - 1){
              arr1[i] = this.funcServer.emptyObj(arr1[i]);          
            }
          }
      }
      return arr1;
    }
    if(arr2.length == 0){
      arr1 = this.funcServer.emptyObj(arr1);
      return arr1;
    }
  }

  public secondFor(arr1,arr2):void{
    // console.log(arr1,arr2);
    let list1 = arr1.menu_list;
    let list2 = arr2.menu_list;
    if(list2.length > 0){
      for(let i = 0;i < list1.length;i++){
        for(let n = 0;n < list2.length;n++){
          // console.log(list2[n].role_auth_id);
          if(list1[i].auth_tag === list2[n].auth_tag && list2[n].role_auth_id){
            // console.log(list2[n].role_auth_id)
            list1[i] = this.funcServer.deepCopy(list2[n]);
            // console.log(list1[i]);
            break;
          }else if(n == list2.length -1 ){
            list1[i] = this.funcServer.emptyObj(list1[i])
          }
        }
      }
    }else{
      for(let i = 0;i < list1.length;i++){
       list1[i] = this.funcServer.emptyObj(list1[i])
      }
    }
  }

  // 点击动作
  public allCheck(item,i):void {
    // 建立一个服务来接收这个值, 或者借助双向绑定, 处理动作
    // item._open = !item._open  // 本例只简单演示开关, 借助 treelists本身实现
    this.addRoleAuth(item.authority_id);
    console.log(item);
    if(item.menu_list.length > 0){
      item.menu_list.forEach(element => {
        this.addRoleAuth(element.authority_id);
      });
    }
  }

   public removeAll(item):void {
    // 建立一个服务来接收这个值, 或者借助双向绑定, 处理动作
    // item._open = !item._open  // 本例只简单演示开关, 借助 treelists本身实现
    this.delRoleAuth(item.role_auth_id);
    if(item.menu_list.length > 0){
      item.menu_list.forEach(element => {
        this.delRoleAuth(element.role_auth_id);
      });
    }
  }

  public itemCheck(i,n,item,event):void{
    // this.allCheckOption[i] = this.allCheckOption[i];
    // console.log(this.checkList[i].menu_list[n].auth_tag);
      this.addRoleAuth(item.parent_authority_id);
      this.addRoleAuth(item.authority_id);
  }

  //添加授权
  public addRoleAuth(authority_id):void{
    this.apiCall.addRoleAuth(this.getRoleId,authority_id,(data) => {
       this.roleList = [];
       layer.msg('授权成功');
       this.roleAuthorityList();
    })
  }

  //取消授权
  public delRoleAuth(role_auth_id):void{
    this.apiCall.delRoleAuth(this.getRoleId,role_auth_id,(data) => {
      this.roleList = [];
      layer.msg('移除授权成功');
      this.roleAuthorityList();
    })
  }

   public verificationConfirm(role_auth_id): void {
    let index = layer.confirm(
      '请确认移除结果',
      {
        title: '确认',
        btn: ["确认", "取消"]
      },
      () => {
        this.delRoleAuth(role_auth_id);
        layer.close(index);
      },
      () => {
         layer.close(index);
      }
    )
  }

  public AllverificationConfirm(item): void {
    let index = layer.confirm(
      '确认全部移除？',
      {
        title: '确认',
        btn: ["确认", "取消"]
      },
      () => {
        this.removeAll(item);
        layer.close(index);
      },
      () => {
         layer.close(index);
      }
    )
  }
}