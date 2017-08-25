/**
 * Created by Kun on 2017/6/22 0008.
 */

import { Component, OnInit, ElementRef, DoCheck } from '@angular/core';
import { FuncServer } from '../../../serv/func.server';
import { ApiCall } from '../../../http/api-call';
import { InsuranceFunction } from '../data-type/insurance-function';
import { offline_json } from './offline-sku-arrList';
import { validateNumber } from '../../../com/ng-validate/number.validate';

declare let layer: any;

@Component({
  selector:'offline-protect',
  templateUrl:'./offline-protect.component.html',
  styleUrls:['./offline-protect.component.css']  
})

export class OfflineProtectComponent implements OnInit,DoCheck{
  public title = '不支持线上自助投保';
  public insurerList =[];
  public insurerData=[];
  public dateEle;
  public allEle;
  public type = 2;
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public tableList=[];
  public insurecode;
  public XianBieattrList = this.funcServer.deepCopy(offline_json.skuArrList);
  public allarrList = [];//全部的险种
  public allSum = 0;//商业险总值
  public selectPrice = [];//选择的保额
  public selectRegardless = [];//选择的不计免赔
  public offline_arrList;
  public windowsOption = '';

  //图片上传存放
  public id_card_file ={
    url:'',
    file_id:''
  }

  public id_card_back_file ={
    url:'',
    file_id:''
  }

  public drive_card_file ={
    url:'',
    file_id:''
  }

  public drive_card_back_file ={
    url:'',
    file_id:''
  }

   public prev_year_file ={
    url:'',
    file_id:''
  }

  // 日期时间
  private selDate: string = '';
  private minDate: string = '1970/01/01';
  private maxDate: string = '9999/12/31';
  private disableDays: number[] = [-1, 7];    //For Sunday and Saturday
  private toContainPrevMonth: boolean = false;
  private toContainNextMonth: boolean = false;
  private value: string = '';
  public setInputDate(event) {
    this.value = event.target.value;
  }
  public setDate(date) {
    this.selDate = date;
  }

  private selDate2: string = '';
  private minDate2: string = '1970/01/01';
  private maxDate2: string = '9999/12/31';
  private disableDays2: number[] = [-1, 7];    //For Sunday and Saturday
  private toContainPrevMonth2: boolean = false;
  private toContainNextMonth2: boolean = false;
  private value2: string = '';
  public setInputDate2(event) {
    this.value2 = event.target.value;
  }
  public setDate2(date) {
    this.selDate2 = date;
  }

    //快递
  public expressShow:boolean = false;
  public expressList = [];
  public insuranceOrderId;
  public expressId;
  public waybillNumber;
  public filterData = {
    searchName: '',
    recommendInsurerId:'',
    name:'',
    provinceCode:'',
    insurerName:'',
    insurerId:'',
    code:'',
  };

  //查看内容
  public readModalData;
  public readModalDataJson;

  //编辑内容
  public modalData;
  public modalDataJson;

  public carBrandOptions;
  public systemFunction = InsuranceFunction;

  // 模态窗
  public modalShow: boolean = false;
  public modalAddShow: boolean = false;
  public readModalShow: boolean = false;

  // 修改窗
  public allChecked:boolean = false;//选择框
  public updateShow:boolean = false;
  public updateModal;

  //图片弹窗
  public imageShow:boolean = false;
  public imageUrl;

  constructor(private elRef: ElementRef,
              private apiCall: ApiCall,
              private funcServer: FuncServer,
              private elementRef:ElementRef) {
  }
              

  public ngOnInit(): void {
    this.computeOnResize();
    this.getInsuranceOrderList();
    this.offline_arrList = this.funcServer.deepCopy(this.XianBieattrList);
    this.offline_arrList.forEach(element => {
      if(element.insured_amount != 'Y'){
        element.insured_amount = '';
      }
    console.log(this.offline_arrList);
    });
  }

  public ngDoCheck():void{
    
  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
  }

  public getInsuranceOrderList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getInsuranceOrderList(this.filterData.searchName,this.type,this.curPageIndex, this.perPageSize, (list, total) => {
      this.tableList = list;
      this.total = total;

    });
  }

  //解决保额返回问题
  public arrListOption(List):void{
    for(let i=0;i<List.length;i++){
      let arrList = List[i].insured_amount;
      if(arrList && arrList != 'Y'){
        let arr = arrList.split(',');
        let list = [];
        for(let n = 0;n < arr.length;n++){
          list.push({
            value:`${arr[n]}`,
            text:arr[n]
          })
        }
        this.allarrList[i] = list;
      }
    }
  }

  //解决商业险价值计算
public allMoney(List):number{
  List = List.map(Number);
  let result = 0;
  result = List.reduce((x,y)=>{
      return x + y;
  })
  this.allSum = result;
  return result;
}

//勾选
  public clickItem(e,item):void{
    let checkbox = e.target;
    let action = (checkbox.checked ? 'add':'remove');
    this.updateSelected(action,item);
  }

  public updateSelected(action,item):void{
    if(action == 'add'){
      item.type = "1"
      // this.selectRegardless.push(item);
    }
    if(action == 'remove'){
      item.type = ""
      // this.selectRegardless.splice(this.selectRegardless.findIndex(value => value == item), 1)
    }
  }

  public allCheck():void{
      this.dateEle = this.elementRef.nativeElement.querySelectorAll('.check-box');
      this.allEle = this.elementRef.nativeElement.querySelector('.allSelect');
      if(this.allEle.checked){
        this.dateEle.forEach(element => {
           element.checked = true;
           this.offline_arrList.forEach(element => {
              if(element.type != "2"){
                element.type = "1"
              }
           });
          // element.click();
          this.allChecked = !this.allChecked;

        }); 
      }else{
         this.dateEle.forEach(element => {
          this.allChecked = !this.allChecked;
           this.offline_arrList.forEach(element => {
              if(element.type != "2"){
                element.type = ""
              }
           });
          element.checked = false;
          this.selectRegardless = [];
        }); 
      }
  }

  //查看
  public getInsuranceOrderDetailsRead(insuranceOrderId):void{
    this.apiCall.getInsuranceOrderDetails(insuranceOrderId,(data)=>{
        this.readModalData = this.funcServer.deepCopy(data);
        if(data.coverage_list){
          this.readModalDataJson = this.funcServer.deepCopy(JSON.parse(data.coverage_list))
        }
      })
  }

  //修改
  public getInsuranceOrderDetails(insuranceOrderId):void{
    this.apiCall.getInsuranceOrderDetails(insuranceOrderId,(data)=>{
        this.arrListOption(this.XianBieattrList);
        this.modalData = this.funcServer.deepCopy(data);
        if(data.coverage_list){
               this.offline_arrList = this.funcServer.deepCopy(JSON.parse(data.coverage_list))
               this.windowsOption = this.offline_arrList[1].option;
                this.offline_arrList.forEach(element => {
                  if(element.insured_amount !== 'Y'){
                    let list = element.insured_amount;
                    list = list.split(",")
                    element.insured_amount = list.length > 1? '': element.insured_amount;
                  }
                  console.log(element.insured_amount);
                });
                console.log(this.offline_arrList);
        }
        this.insurecode = this.modalData.insurer_code;
        this.selDate = this.modalData.ci_begin_date;
        this.selDate2 = this.modalData.bi_begin_date;
        //文件
        // this.id_card_file.url = this.modalData.id_card_Front;
        // this.id_card_back_file.url = this.modalData.id_card_back ;
        // this.drive_card_file.url = this.modalData.driving_license;
        // this.drive_card_back_file.url = this.modalData.driving_license_copy;
        // this.prev_year_file.url = this.modalData.last_year_policy;
        // alert(this.id_card_file.url);
        // this.id_card_file.file_id = this.modalData.id_card_Front_id;
        // this.id_card_back_file.file_id = this.modalData.id_card_back_id;
        // this.drive_card_file.file_id = this.modalData.driving_license_id;
        // this.drive_card_back_file.file_id = this.modalData.driving_license_copy_id;
        // this.prev_year_file.file_id = this.modalData.last_year_policy_id;
      })
  }

  public updateExpress():void{
    this.apiCall.updateExpress(this.insuranceOrderId,this.expressId,this.waybillNumber,(data)=>{
        this.expressModal();
        this.getInsuranceOrderList();
    })
  }

  public getExpressList():void{
    this.apiCall.getExpressList((data)=>{
         data.forEach(element => {
           this.expressList.push({
              value:element.express_id,
              text:element.express_name
            })
      });
    })
  }

  public updateInsuranceOrder(theForm):void{
    let submit = false;
    for(let key in theForm.controls){
      // theForm.controls.key.errors;
      if(theForm.controls[key].errors || isNaN(this.modalData.bi_premium)){
        layer.msg(`填写错误，请按照指示填写`)
        submit = true;
        break;
      }
    }
    if(!submit){
      this.modalData.ci_begin_date = this.selDate;
      this.modalData.bi_begin_date = this.selDate2;
      this.modalData.bi_premium = this.allSum;
      this.apiCall.updateInsuranceOrder(
        this.modalData.insurance_order_id,
        this.modalData.id_card_Front,
        this.modalData.id_card_back,
        this.modalData.driving_license,
        this.modalData.driving_license_copy,
        this.modalData.last_year_policy,
        this.modalData.insurer_code,
        this.modalData.ci_premium,
        this.modalData.carship_tax,
        JSON.stringify(this.offline_arrList),
        this.modalData.bi_premium,
        this.modalData.ci_begin_date,
        this.modalData.bi_begin_date,
        (data)=>{
          this.allEle = this.elementRef.nativeElement.querySelector('.allSelect');
          this.allEle.checked = false;
          this.toggleModal();
          this.getInsuranceOrderList();
      });
    }
  }
  //保险
    public getInsurerOption():void{
        let Options = [];
        this.apiCall.getInsurerList((data)=>{
            this.insurerData = data;
            for(let key in this.insurerData){
                Options.push({
                    value:this.insurerData[key].code,
                    text:this.insurerData[key].name
                })
            }
        })
        this.insurerList = Options;
    }

  //查看弹窗
  public toggleReadModal(insuranceOrderId?):void{
    this.readModalShow = !this.readModalShow;
    if (insuranceOrderId){
        this.getInsuranceOrderDetailsRead(insuranceOrderId);
    }
    if(!this.readModalShow){
      this.readModalData = this.funcServer.emptyObj(this.readModalData);
      this.readModalDataJson = this.funcServer.emptyObj(this.readModalDataJson);
    }
  }

  //模态窗
  public toggleModal(insuranceOrderId?): void {
    if (insuranceOrderId){
        this.getInsurerOption();
        this.getInsuranceOrderDetails(insuranceOrderId);
    }
    this.modalShow = !this.modalShow;
    if (!this.modalShow) {
      this.modalData = this.funcServer.emptyObj(this.modalData);
      this.modalDataJson = this.funcServer.emptyObj(this.modalDataJson);
      this.offline_arrList = this.funcServer.deepCopy(this.XianBieattrList);
      this.windowsOption = '';
      this.selDate = '';
      this.selDate2 = '';
      this.insurecode = '';
      this.id_card_file.file_id = '';
      this.id_card_back_file.file_id = '' ;
      this.drive_card_file.file_id = '';
      this.drive_card_back_file.file_id = '';
      this.prev_year_file.file_id = '';
    }
  }

  public expressModal(insuranceOorderId?):void{
    this.expressShow = !this.expressShow;
    if(insuranceOorderId){
      this.getExpressList();
      this.insuranceOrderId = insuranceOorderId;
    }
    if(!this.expressShow){
      this.expressList = [];
      this.expressId = '';
      this.waybillNumber = '';
    }
  }


  // //关闭订单
  public closeInsuranceOrder(insuranceOrderId):void{
    this.apiCall.closeInsuranceOrder(insuranceOrderId,(data)=>{
        this.getInsuranceOrderList();
    })
  }

  public modalSubmit(theForm):void {
    let submit = false;
    for(let key in theForm.controls){
      if(theForm.controls[key].errors){
        layer.msg(`填写错误，请按照指示填写`)
        submit = true;
        break;
      }
    }
    if(!submit){
      if (this.insuranceOrderId) {
        this.updateExpress();
      }  
    }
  }

  public updateInsuranceOrderMoney():void{
    this.apiCall.updateInsuranceOrderMoney(this.updateModal.insurance_order_id,this.updateModal.money,this.updateModal.actual_money,this.updateModal.rebate,this.updateModal.profit,(data)=>{
        this.toggleUpdateModal();
        this.getInsuranceOrderList(1);
    });
  }

  //修改弹窗
  public toggleUpdateModal(item?):void{
    this.updateShow = !this.updateShow;
    if(item){
      this.updateModal = this.funcServer.deepCopy(item);
      console.log(this.updateModal);
     
    }
    if(!this.updateShow){
      this.updateModal = this.funcServer.emptyObj(this.updateModal);
    }
  }

  //确认弹窗
  public verificationConfirm(insuranceOrderId): void {
    let adminId = '';
    let index = layer.confirm(
      '确认关闭订单吗？',
      {
        title: '确认',
        btn: ["确认", "取消"]
      },
      () => {
        this.closeInsuranceOrder(insuranceOrderId);
        layer.close(index);
      },
      () => {
        layer.close(index);
      }
    )
  }

  //图片弹窗
  public toggleImageModal(imageUrl?):void{
    this.imageShow = !this.imageShow;
    if(imageUrl){
      this.imageUrl = imageUrl;
    }
    if(!this.imageShow){
      this.imageUrl = '';
    }
  }
}
