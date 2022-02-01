import { Client, ClientStatus, Employee, PaginatedResult } from '../../core/models/get';
import { ClientService, ClientStatusService, EmployeeService } from '../../core/services';
import { Component, OnInit } from '@angular/core';

import { AllDataResponse } from '../../core/models/get/AllDataResponse';
import { CommonDataService } from '../../../../../../libs/common-services/commonData.service';
import { ElementSchemaRegistry } from '@angular/compiler';
import { FetchclientsService } from '../../core/services/fetchclients.service';
import { FormControl } from '@angular/forms';
import { NotificationBar } from '../../utils/feedbacks/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { OperatingAddress } from '../../core/models/get/operating-address';
import { OperationalAddressService } from '../../core/services/operational-address.service';
import { PermissionListService } from '../../../../../../libs/common-services/permission.service';
import { Router } from '@angular/router';
import { UpdateBillingAddress } from '../../core/models/update/UpdateBillingAddress';
import { UpdateClient } from '../../core/models/update/UpdateClient';
import { UpdateClientContact } from '../../core/models/update/UpdateClientContact';
import { UpdateClientStateService } from '../../core/State/update-client-state.service';
import { UpdateCompanyContact } from '../../core/models/update/UpdateCompanyContact';
import { UpdateOperatingAddress } from '../../core/models/update/UpdateOperatingAddress';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'exec-epp-view-clients',
  templateUrl: './view-clients.component.html',
  styleUrls: ['./view-clients.component.scss'],
})

export class ViewClientsComponent implements OnInit  {
  isAddButtonDisabled = false;
  isVisible = false;

  paginatedprojects$!: Observable<PaginatedResult<Client[]>>;

  clientsdata: Client[] = [];
  searchProject = new FormControl();
  total = 10;
  totalRecordBackup=0;
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  idParam = '';
  totalPage!: number;
  searchKey = '';
  unfilteredData!: Client[];
  AllData!: PaginatedResult<Client[]>;
  searchStateFound = false;
  sortByParam="";
  sortDirection = "asc";

  clientCheckbox = true;
  locationCheckbox = true;
  statusCheckbox = true;
  salesCheckbox = true;
  clientContactCheckbox = false;
  companyContactCheckbox = false;
  isFilter= false;
  listOfSearchName: string[] = [];
  searchAddress!: string;
  listofNames = [''];
  nameofclient = '';
  namesofclientsfilterd = [{ text: '', value: '', checked: false }];
  filteredArray = [''];
  ListOfSalesPerson = [''];
  namesofSalesPerson = '';
  filteredPersonArray = [''];
  namesofSalesfilterd = [{ text: '', value: '', checked: false }];
  searchSalesPerson!: string;
  listsearchSalesPerson: string[] = [];
  searchAddressList: string[] = [];
  searchstatusList: string[] = [];
  searchsalesPersonList: string[] = [];
  listOfLocation: string[] = [];
  nameOfLocation = '';
  namesofLocationsfilterd = [{ text: '', value: '', checked: false }];
  clientStatuses!: ClientStatus[];
  selectedValue!: string;
  locations!: OperatingAddress[];
  employees!: Employee[];
  allClients!: Client[];
  totalData: Client[]= [];
  totalData1: Client[]= [];
  clientEdit:UpdateClient={} as UpdateClient;
  ClientContactsEdit:UpdateClientContact []=[];
  CompanyContactsEdit:UpdateCompanyContact[]=[];
  OperatingAddressEdit:UpdateOperatingAddress []=[];
  BillingAddressEdit:UpdateBillingAddress []=[];
  clientDataByID!:any;
  employeesEdit:Employee[]=[];
  constructor(
    private router: Router,
    private _clientservice: ClientService,
    private clientStatusService: ClientStatusService,
    private operatingAddressService: OperationalAddressService,
    private fetchclientsService: FetchclientsService,
    private employeeService: EmployeeService,
    private notification: NzNotificationService,
    private _notification: NotificationBar,
    private _permission:PermissionListService,
   private _commonData:CommonDataService,
   private _editClientService:UpdateClientStateService
  ) {

_commonData.getPermission()
  }
  ngOnInit(): void {
    this.isAddButtonDisabled=this._permission.authorizedPerson('Create_Client');
    console.log(this.isAddButtonDisabled);
    console.log("button check");

    // authorized=false isdabled = false

    this.getClientStatus();
    this.getLocations();
    this.getSalesPerson();
    this.fetchAllData();
    this.initializeData();

    this.searchProject.valueChanges.pipe(debounceTime(1500)).subscribe(() => {
      this.SearchData();
    });
    this._notification.showNotification({

      type: 'success',

      content: '',

      duration: 1,

    });
    // this.notification.error('', '', {



    //   });

  }

  Edit(client: any): void {
    if(client)
   {

   this.setClient(client);
   this._editClientService.isDefault=false;
  this._editClientService.isEdit=true;
  this._editClientService.updateClientcomapanyContacts(this.employeesEdit);
  this._editClientService.updateClient(this.clientEdit);
  this._editClientService.save='Update';
  this._editClientService.breadCrumb='Edit Clients';
  this._editClientService.titlePage='Edit Client';
  this._editClientService.formTitle='Edit Client Details';
  this._editClientService.isAdd=false;
  this.router.navigate(['clientmanagement/add-client/']);
  // clientmanagement/add-client
  }
  }
  setClient(client:Client){
    if(client.ClientContacts)
    {
      this.setContact(client.ClientContacts);
    }
    if(client.CompanyContacts)
    {
      this.setContactCompany(client.CompanyContacts);
    }
    if(client.OperatingAddress)
    {
      this.setOperatingAddress(client.OperatingAddress);
    }
    if(client.BillingAddress)
    {
      this.setBillingAddress(client.BillingAddress);
    }
  this.clientEdit.Guid=client.Guid;
  this.clientEdit.ClientName=client.ClientName;
  this.clientEdit.ClientStatusGuid=client.ClientStatusGuid;
  this.clientEdit.SalesPersonGuid=client.SalesPersonGuid;
  this.clientEdit.Description=client.Description;
  this.clientEdit.ClientContacts=this.ClientContactsEdit;
  this.clientEdit.CompanyContacts=this.CompanyContactsEdit;
  this.clientEdit.OperatingAddress=this.OperatingAddressEdit;
  this.clientEdit.BillingAddress=this.BillingAddressEdit;

  }
  setContact(ClientContacts:any[]){
    if(!ClientContacts?.length){
      return;
    }
   for(let i=0;i<ClientContacts.length;i++)
   {
     const contact={
      Guid:ClientContacts[i].Guid,
      ContactPersonName: ClientContacts[i].ContactPersonName,
      Email: ClientContacts[i].Email,
      PhoneNumber: ClientContacts[i].PhoneNumber,
      PhoneNumberPrefix:ClientContacts[i].PhoneNumberPrefix+''
     }
     this.ClientContactsEdit.push(contact);
   }
  }
  setContactCompany(comapanyContacts:any[])
  {
    if(!comapanyContacts?.length){
      return;
    }
    for(let i=0;i<comapanyContacts.length;i++)
    {
      const contactPersonGuid={
        Guid:comapanyContacts[i].Guid,
        ContactPersonGuid:comapanyContacts[i].EmployeeID
      }
      this.CompanyContactsEdit.push(contactPersonGuid);
      this.employeesEdit.push(comapanyContacts[i].Employee)
    }
  }
  setOperatingAddress(OperatingAddress:any[])
  {
    if(!OperatingAddress?.length){
      return;
    }
    for(let i=0;i<OperatingAddress.length;i++)
    {
      const opAddr={
        Guid:OperatingAddress[i].Guid,
        Country:OperatingAddress[i].Country,
        City:OperatingAddress[i].City,
        State:OperatingAddress[i].State,
        ZipCode:OperatingAddress[i].ZipCode,
        Address:OperatingAddress[i].Address,
      }
      this.OperatingAddressEdit.push(opAddr);
    }
  }
  setBillingAddress(BillingAddress:any[]){
    if(!BillingAddress?.length){
      return;
    }
    for(let i=0;i<BillingAddress.length;i++)
    {
      const blAddr={
        Guid:BillingAddress[i].Guid,
        Name : BillingAddress[i].Name,
        Affliation : BillingAddress[i].Affliation,
        Country:BillingAddress[i].Country,
        City:BillingAddress[i].City,
        State:BillingAddress[i].State,
        ZipCode:BillingAddress[i].ZipCode,
        Address:BillingAddress[i].Address,
      }
      this.BillingAddressEdit.push(blAddr);
    }
  }
  DeleteClient(client:any){
    this._clientservice.deleteClient(client.Guid).subscribe(
      (res:any)=>{
        if(res.ResponseStatus==='Success')
        {
         this.notification.success("Client Deleted Successfully","",{nzPlacement:'bottomRight'}
         );
         this.router.navigateByUrl('clients');
        }

       },
      err=>{
        this.notification.error("Client was not Deleted",'',{nzPlacement:'bottomRight'})
      }
    );
   }
  authorizedPerson(key:string){
    return this._permission.authorizedPerson(key);
    // if(key==='Create_Client')
    // {
    //   this.isAddButtonDisabled=true;
    // }
    // else{
    //   this.isAddButtonDisabled=false;
    // }


  }

  showModal(): void {
    this.isVisible = true;
  }

  sorter(id:number) {
    if (id === 1){
      this.sortByParam = "ClientName";
    } else if (id === 2){
      this.sortByParam = "OperatingAddressCountry";
    }else if (id === 3) {
      this.sortByParam = "ClientStatusName";
    } else if (id === 4) {
      this.sortByParam = "SalesPersonName";
    }

    if (this.sortDirection === 'desc') {
      this.sortDirection = 'asc';
    } else {
      this.sortDirection = 'desc';
    }
  }

  onDefaultClick() {
    this.clientCheckbox = true;
    this.locationCheckbox = true;
    this.statusCheckbox = true;
    this.salesCheckbox = true;
    this.clientContactCheckbox = false;
    this.companyContactCheckbox = false;
  }

  addClientPage() {
    this.router.navigateByUrl('clientmanagement/add-client');
    this._editClientService.isEdit=false;
    this._editClientService.save='Save';
    this._editClientService.breadCrumb='Add Clients';
    this._editClientService.titlePage='Add Client';
    this._editClientService.formTitle='Enter Client Details';
    this._editClientService.isAdd=true;
    this._editClientService.restUpdateClientState();
  }

  PageSizeChange(pageSize: number) {
    console.log(pageSize);
    this.pageSize = pageSize;
    this._clientservice
      .getWithPagnationResut(this.pageIndex, pageSize, this.searchProject.value)
      .subscribe((response: PaginatedResult<Client[]>) => {
        this.clientsdata = response.data;
        this.pageIndex = response.pagination.pageIndex;
        this.pageSize = response.pagination.pageSize;
        this.loading = false;

      });
  }


  getAllClientData(index: any) {
    console.log(index);

      this._clientservice
        .getWithPagnationResut(index, 10, this.searchProject.value)
        .subscribe((response: PaginatedResult<Client[]>) => {
          this.totalData1= response.data
          this.totalData.push(...this.totalData1);

        });

    }
  PageIndexChange(index: any): void {

   if(this.isFilter){
    this.clientsdata =this.totalData.slice((index-1)*10,index*10);

   }
   else{
    this.pageIndex = index;
    this.loading = true;
    if (this.searchProject.value?.length && this.searchProject.value?.length > 1 && this.searchStateFound == true) {
      this._clientservice
        .getWithPagnationResut(index, 10, this.searchProject.value)
        .subscribe((response: PaginatedResult<Client[]>) => {
          this.clientsdata = response.data;
          this.unfilteredData = response.data;
          this.pageIndex = response.pagination.pageIndex;
          this.total = response.pagination.totalRecord;

          this.totalPage = response.pagination.totalPage;
          this.pageSize = response.pagination.pageSize;
          this.loading = false;
        });


    } else {
      this._clientservice
        .getWithPagnationResut(index, 10)
        .subscribe((response: PaginatedResult<Client[]>) => {
          this.clientsdata = response.data;
          this.unfilteredData = response.data;
          this.pageIndex = response.pagination.pageIndex;
          this.pageSize = response.pagination.pageSize;
          this.loading = false;
          if((this.searchAddressList.length && this.searchAddressList.length > 0) || (this.searchstatusList.length && this.searchstatusList.length > 0) || (this.searchsalesPersonList.length && this.searchsalesPersonList.length > 0)){
            this.search(
              this.searchAddressList,
              this.searchstatusList,
              this.searchsalesPersonList
            );

          }


        });
      this.searchStateFound = false;
    }}
  }

  initializeData(): void {
    this._clientservice
      .getWithPagnationResut(1, 10)
      .subscribe((response: PaginatedResult<Client[]>) => {
        this.AllData = response;
        this.clientsdata = response.data;
        this.unfilteredData = response.data;
        this.pageIndex = response.pagination.pageIndex;
        this.pageSize = response.pagination.pageSize;
        this.total = response.pagination.totalRecord;
        this.totalPage = response.pagination.totalPage;
        this.loading = false;
        this._clientservice.setFristPageOfClients(response);
        this.findlistofNames();
        this.findlistSalesPersonNames();
        this.findlistOfLocation();
        console.log(response.data);
      });

    this._clientservice.fristPagantionClients$.subscribe(
      (response: PaginatedResult<Client[]>) => {
        this.AllData = response;
        this.clientsdata = response.data;
        this.unfilteredData = response.data;
        this.pageIndex = response.pagination?.pageIndex;
        this.pageSize = response.pagination?.pageSize;
        this.total = response.pagination?.totalRecord;
        this.totalPage = response.pagination?.totalPage;
        this.loading = false;
      }
    );
  }
  SearchData(): void {
    if (this.searchProject.value?.length > 1) {
      this.loading = true;
      this._clientservice
        .getWithPagnationResut(1, 10, this.searchProject.value)
        .subscribe((response: PaginatedResult<Client[]>) => {
          if (response?.data?.length && response?.data.length > 0) {
            this.loading = false;
            this.AllData = response;
            this.clientsdata = response.data;
            this.unfilteredData = response.data;
            this.pageIndex = response.pagination.pageIndex;
            this.pageSize = response.pagination.pageSize;
            this.total = response.pagination.totalRecord;
            this.totalPage = response.pagination.totalPage;
            this.searchStateFound = true;
          } else {
            this.loading = false;
            this.clientsdata = [] as Client[];
            this.unfilteredData = [] as Client[];
            this.pageIndex = 0;
            this.pageSize = 0;
            this.total = 0;
            this.totalPage = 0;
            this.searchStateFound = false;
            this.notification.blank('  Project not found', '', {
              nzPlacement: 'bottomLeft',
            });
          }
        });
    } else {
      this.clientsdata = this._clientservice.getFirsttPageValue().data;
      this.unfilteredData = this._clientservice.getFirsttPageValue().data;
      this.pageIndex =
        this._clientservice.getFirsttPageValue().pagination.pageIndex;
      this.pageSize =
        this._clientservice.getFirsttPageValue().pagination.pageSize;
      this.total =
        this._clientservice.getFirsttPageValue().pagination.totalRecord;
      this.totalPage =
        this._clientservice.getFirsttPageValue().pagination.totalPage;
    }
  }

  findlistofNames(): void {
    this.listofNames = [''];
    if(!this.clientStatuses?.length){
      return;
    }
    for (let i = 0; i < this.clientStatuses.length; i++) {
      this.nameofclient = this.clientStatuses[i].StatusName;
      this.listofNames.push(this.nameofclient);
      this.filteredArray = this.listofNames.filter((item, pos) => {
        return this.listofNames.indexOf(item) == pos;
      });
      this.listofNames = this.filteredArray.filter((item) => item);
    }

    for (let i = 0; i < this.listofNames.length; i++) {
      this.namesofclientsfilterd.push({
        text: this.listofNames[i],
        value: this.listofNames[i],
        checked: true,
      });
    }
    console.log(this.namesofclientsfilterd);

    this.namesofclientsfilterd = this.namesofclientsfilterd.filter(
      (word) => word
    );
    this.namesofclientsfilterd.shift();

    console.log(this.namesofclientsfilterd);
  }

  findlistSalesPersonNames(): void {
    this.ListOfSalesPerson = [''];
    if(!this.employees.length){
      return;
    }
    for (let i = 0; i < this.employees.length; i++) {
      this.namesofSalesPerson = this.employees[i].Name;
      this.ListOfSalesPerson.push(this.namesofSalesPerson);
      this.filteredPersonArray = this.ListOfSalesPerson.filter((item, pos) => {
        return this.ListOfSalesPerson.indexOf(item) == pos;
      });

      this.ListOfSalesPerson = this.filteredPersonArray.filter((item) => item);
    }

    for (let i = 0; i < this.ListOfSalesPerson.length; i++) {
      this.namesofSalesfilterd.push({
        text: this.ListOfSalesPerson[i],
        value: this.ListOfSalesPerson[i],
        checked: true,
      });
    }

    this.namesofSalesfilterd = this.namesofSalesfilterd.filter((word) => word);
    this.namesofSalesfilterd.shift();

    console.log(this.namesofSalesfilterd);
  }

  findlistOfLocation(): void {
    this.listOfLocation = [''];
    if(!this.locations?.length){
      return;
    }
    for (let i = 0; i < this.locations.length; i++) {
      this.nameOfLocation = this.locations[i].Country;
      this.listOfLocation.push(this.nameOfLocation);
      this.filteredPersonArray = this.listOfLocation.filter((item, pos) => {
        return this.listOfLocation.indexOf(item) == pos;
      });

      this.listOfLocation = this.filteredPersonArray.filter((item) => item);
    }

    for (let i = 0; i < this.listOfLocation.length; i++) {
      this.namesofLocationsfilterd.push({
        text: this.listOfLocation[i],
        value: this.listOfLocation[i],
        checked: true,
      });
    }

    this.namesofLocationsfilterd = this.namesofLocationsfilterd.filter(
      (word) => word
    );
    this.namesofLocationsfilterd.shift();

    console.log(this.namesofLocationsfilterd);
  }

getClientStatus() {

  this.clientStatusService.getAll().subscribe((res: ClientStatus[]) => {
    this.clientStatuses = res;
      });
}

getLocations(){
  this.operatingAddressService.getData().subscribe((res:AllDataResponse<OperatingAddress[]>) => {
    this.locations = res.data;
  }, error => {
    console.log(error);
  });
}
fetchAllData(){
  this.fetchclientsService.getData().subscribe((res:AllDataResponse<Client[]>) => {
    this.allClients = res.data;

      });

}
getSalesPerson(){
  this.employeeService.getAll().subscribe((response: Employee[]) => {
    this.employees = response;
  })
}
  search(
    searchAddressList: string[],
    searchstatusList: string[],
    searchsalesPersonList: string[]
  ): void {
    this.searchstatusList = searchstatusList;

    this.searchAddressList = searchAddressList;

    this.searchsalesPersonList = searchsalesPersonList;
    if((this.searchAddressList?.length && this.searchAddressList.length > 0) || (this.searchstatusList?.length && this.searchstatusList.length> 0) || (this.searchsalesPersonList?.length && this.searchsalesPersonList.length> 0)){
      this.isFilter =true;
      this.totalData =[];
      this.loading = true;
      for(let i = 1; i <=this.totalPage;i++){
      this.getAllClientData(i);
      }

      setTimeout(() => {
        this.clientsdata = this.totalData;
        this.loading = false;

        const filterFunc = (item: Client) =>
          (this.searchAddressList?.length
            ? this.searchAddressList.some(
                (address) =>
                  item.OperatingAddress[0].Country.indexOf(address) !== -1
              )
            : true) &&
          (this.searchstatusList?.length
            ? this.searchstatusList.some(
                (name) => item.ClientStatusName.indexOf(name) !== -1
              )
            : true) &&
          (this.searchsalesPersonList?.length
            ? this.searchsalesPersonList.some(
                (name) => item.SalesPerson.Name.indexOf(name) !== -1
              )
            : true);
        const data = this.clientsdata.filter((item) => filterFunc(item));
        this.clientsdata = data.slice(0,10);
        this.totalRecordBackup=this.total
              this.totalData=data;
              this.total=data.length;


      },4000)
    }
    else{
      this.isFilter = false;
      this.clientsdata = this.unfilteredData;
      this.total=this.totalRecordBackup;
    }

    // console.log(data);
  }
}
