






import { NzIconModule } from 'ng-zorro-antd/icon';
import { Client } from '../../core/models/get/client';



import {  PaginatedResult } from "../../core/models/get";
import { Component, OnInit } from "@angular/core";
  


import { ClientService } from "../../core/services";
import { FormControl } from "@angular/forms";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: 'exec-epp-view-clients',
  templateUrl: './view-clients.component.html',
  styleUrls: ['./view-clients.component.scss']
})
export class ViewClientsComponent implements OnInit  {
  isVisible = false;
  paginatedprojects$!: Observable<PaginatedResult<Client[]>>;

  clientsdata: Client[] = [];
  searchProject = new FormControl();
  total = 10;
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  idParam = '';
  totalPage!: number;
  searchKey = '';
  unfilteredData!:Client[];
  // clientsdata!: Client[];
  AllData!: PaginatedResult<Client[]>;
  searchStateFound = false;
  //client:Client[]=[];

  sortByParam="";
  sortDirection = "asc";

  //  values = [
  //   {client:'CocaCola',address:'Ethiopia',status:'Active',sales_person:'Yonas',client_contact:'Ayalew',company_contact:'Seifu'},
  //   {client:'McDonalds',address:'USA',status:'On-Hold',sales_person:'Abebe',client_contact:'Jhon',company_contact:'Jimy'},
  //   {client:'Apple',address:'USA',status:'Active',sales_person:'Zerihun',client_contact:'Henock',company_contact:'Haile'},
  //   {client:'Pepsi',address:'Canada',status:'Terminated',sales_person:'Robel',client_contact:'Yonatan',company_contact:'Pete'},
  // ]
  namesofclients = [{text:'Excelerent',value:'Excelerent',checked:true},
  {text:'CocaCola',value:'CocaCola',checked:false},
  {text:'Amazon',value:'Amazone',checked:false}];

  namesoflocations = [{text:'Ethiopia',value:'Ethiopia',checked:true},
  {text:'USA',value:'USA',checked:false},
  {text:'Canada',value:'Canada',checked:false}];
  namesofStatuses = [{text:'Active',value:'Active',checked:true},
  {text:'Signed',value:'Signed',checked:false},
  {text:'Terminated',value:'Terminated',checked:false}];

  listOfColumns = [
    {
      id: 'Client',
      label: 'Client',
      isChecked: true,
    },
    {
      id: 'Location',
      label: 'Location',
      isChecked: true,
    },
    {
      id: 'Status',
      label: 'Status',
      isChecked: true,
    },
    {
      id: 'SalesPerson',
      label: 'SalesPerson',
      isChecked: true,
    },
    {
      id: 'ClientContact',
      label: 'ClientContact',
      isChecked: false,
    },
    {
      id: 'CompanyContact',
      label: 'CompanyContact',
      isChecked: false,
    },
  ];

  sortName!: string;
  sortValue!: string;
  listOfSearchName: string[] = [];
  searchAddress!: string;
  listofNames = [''];
  nameofclient = '';
  namesofclientsfilterd = [{ text: '', value: '', checked: false }];
  filteredArray = [''];
  constructor(private router:Router,private _clientservice: ClientService, private notification:NzNotificationService) { }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');

    
    // this._clientservice.getAll().subscribe((clientRespose:any)=>{
    //   this.client=clientRespose.Data;
    //   console.log(this.client);
    // });
    this.initializeData();
  // this. getAllData();
  this.searchProject.valueChanges.pipe(debounceTime(3000)).subscribe(() => {
    this.SearchData();
  });
  this._clientservice.getWithPagnationResut(this.pageIndex, this.pageSize,).subscribe((response: PaginatedResult<Client[]>) => {
    this.clientsdata = response.data;
    this.pageIndex = response.pagination.pageIndex;
    this.pageSize = response.pagination.pageSize;
    console.log("log");
    console.log(this.clientsdata);
    console.log("log2");
    this.loading = false;
  });



  }
  showModal(): void {
    this.isVisible = true;
  }

  sorter(id:number) {
    if (id === 1){
      this.sortByParam = "client";
    } else if (id === 2){
      this.sortByParam = "address";
    }else if (id === 3) {
      this.sortByParam = "status";
    } else if (id === 4) {
      this.sortByParam = "sales_person";
    }

    if (this.sortDirection === "desc") {
      this.sortDirection = "asc"
    } else {
      this.sortDirection = "desc"
    }
  }

  onDefaultClick() {
    this.listOfColumns[0].isChecked = true;
    this.listOfColumns[1].isChecked = true;
    this.listOfColumns[2].isChecked = true;
    this.listOfColumns[3].isChecked = true;
    this.listOfColumns[4].isChecked = false;
    this.listOfColumns[5].isChecked = false;
  }

  addClientPage()
  {
     this.router.navigateByUrl('clients/add-client');
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


  PageIndexChange(index: any) : void {
    console.log(index);
    this.pageIndex = index;
    this.loading = true;
    if (this.searchProject.value?.length > 1 && this.searchStateFound == true) {
      this._clientservice
        .getWithPagnationResut(index, 10, this.searchProject.value)
        .subscribe((response: PaginatedResult<Client[]>) => {
          this.clientsdata = response.data;
          this.pageIndex = response.pagination.pageIndex;
          this.pageSize = response.pagination.pageSize;

          this.loading = false;
        });
    } else {
      this._clientservice
        .getWithPagnationResut(index, 10)
        .subscribe((response: PaginatedResult<Client[]>) => {
          this.clientsdata = response.data;
          this.pageIndex = response.pagination.pageIndex;
          this.pageSize = response.pagination.pageSize;
          this.loading = false;
        });
      this.searchStateFound = false;
    }
  }




  initializeData():void{
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

    });

  this._clientservice.fristPagantionClients$.subscribe(
    (response: PaginatedResult<Client[]>) => {
      this.AllData = response;
      this.clientsdata = response.data;
      this.unfilteredData = response.data;
      this.pageIndex = response.pagination.pageIndex;
      this.pageSize = response.pagination.pageSize;
      this.total = response.pagination.totalRecord;
      this.totalPage = response.pagination.totalPage;
      this.loading = false;
    }
  );
  }
  SearchData():void {

    if (this.searchProject.value?.length > 1) {
      this.loading = true;
      this._clientservice
        .getWithPagnationResut(1, 10, this.searchProject.value)
        .subscribe((response: PaginatedResult<Client[]>) => {
          if (response?.data.length > 0) {
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
            this.unfilteredData =[] as Client[];
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
      }
      else {
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
    for (let i = 0; i < this.clientsdata.length; i++) {
      this.nameofclient = this.clientsdata[i].ClientName;
      this.listofNames.push(this.nameofclient);
      this.filteredArray = this.listofNames.filter((item, pos) => {
        return this.listofNames.indexOf(item) == pos;
      });
      console.log(this.AllData);
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

    this.namesofclientsfilterd = this.namesofclientsfilterd.filter((word) => word);
    this.namesofclientsfilterd.shift();

    console.log(this.namesofclientsfilterd);
  }
  // data = this.projects;


  filter(listOfSearchName: string[], searchAddress: string): void {
    this.listOfSearchName = listOfSearchName;
    this.searchAddress = searchAddress;
    this.clientsdata = this.unfilteredData;
    this.search(false);

  }

  search(reset:boolean): void {
    /** filter data **/
    // console.log("This is Reset  "+reset);
    // if(reset){
    //   this.ngOnInit();
    //   // this.pageIndex = 1;

    // }

    const filterFunc = (item: Client) =>
      (this.searchAddress
        ? item.ClientName.indexOf(this.searchAddress) !== -1
        : true) &&
      (this.listOfSearchName.length
        ? this.listOfSearchName.some(
            (name) => item.ClientName.indexOf(name) !== -1
          )
        : true);
    const data = this.clientsdata.filter((item) => filterFunc(item));
    this.clientsdata = data;
    console.log(data);
    /** sort data **/
    // if (this.sortName) {
    //   this.clientsdata = data.sort((a, b) =>
    //     this.sortValue === 'ascend'
    //       // ? a[this.sortName] > b[this.sortName]
    //         ? 1
    //         // eslint-disable-next-line no-constant-condition
    //         : -1
    //       // : b[this.sortName] > a[this.sortName]
    //       ? 1
    //       : -1
    //   );
    // } else {
    //   this.clientsdata = data;
    //   // this.total = this.projects.length;
    // }
  }

  // getAllData(){


  //  this._clientservice.getAll().subscribe((response)=>
  //   {
  //     console.log("This is All Data"+response);
  //     return response;
  //   });

  // }

}
