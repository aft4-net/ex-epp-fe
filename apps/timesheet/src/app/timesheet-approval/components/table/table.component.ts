import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { TimesheetService } from '../../../timesheet/services/timesheet.service';

interface ItemData {
  TimesheetApprovalGuid:string,
  TimesheetId: string,
  name: string;
  dateRange: string;
  projectName: number;
  clientName: string;
  hours: number,
  stats: string
}

@Component({
  selector: 'exec-epp-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  timesheetDetail:any;
  isModalVisible=false;
  timesheetEntries:any;
  entryDate:any;

  total=10;
  pageIndex = 1;
  pageSize = 10;

  sortByParam="";
  sortDirection = "asc";
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly ItemData[] = [];
  listOfData: readonly ItemData[] = [];
  setOfCheckedId = new Set<string>();

  //timesheetDetail:any;
  //isModalVisible=false;

  arrayOfCheckedId:string[] =[];



  @Input() rowData : any[] = [];
  @Input() colsTemplate: TemplateRef<any>[] | undefined;
  @Input() headings: string[] | undefined;
  @Input() bulkCheck: boolean | undefined;
  @Input() status: boolean | undefined;

  @Output() checkedListId = new EventEmitter<Set<number>>();
  @Output() sorter = new EventEmitter<string>();
  @Output() sortingDirection = new EventEmitter<string>();
  qtyofItemsChecked = 0

  @Output() itemsSelected = new EventEmitter<number>();
  //@Output() CheckedIds = new EventEmitter<number[]>();
  @Output() CheckedIds = new EventEmitter<Set<string>>();

  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.onAllChecked(true);
      }
    }
  ];


  constructor(private readonly timesheetService:TimesheetService)
  {}

  updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
      this.arrayOfCheckedId.push(id);
      console.log(this.setOfCheckedId);
      //console.log(this.arrayOfCheckedId)

    } else {
      this.setOfCheckedId.delete(id);
      this.RemoveElementFromArray(id);
      console.log(this.setOfCheckedId);
      //console.log(this.arrayOfCheckedId)
    }
    this.CheckedIds.emit(this.setOfCheckedId);

  }
  RemoveElementFromArray(element: string) {
    this.arrayOfCheckedId.forEach((value,index)=>{
        if(value==element) this.arrayOfCheckedId.splice(index,1);
    });
}

  onItemChecked(id: string, checked: boolean): void {
    //this.qtyofItemsChecked = this.qtyofItemsChecked + (checked? 1: -1);
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
    this.qtyofItemsChecked= this.setOfCheckedId.size;
    this.itemsSelected.emit(this.qtyofItemsChecked);
  }

  onAllChecked(value: boolean): void {
    //this.qtyofItemsChecked = this.qtyofItemsChecked + (value? 1: -1);
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.TimesheetApprovalGuid, value));
    this.refreshCheckedStatus();
    this.qtyofItemsChecked= this.setOfCheckedId.size;
    this.itemsSelected.emit(this.qtyofItemsChecked);
  }

  onCurrentPageDataChange($event: readonly ItemData[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    //this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));

    //this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

  sorterMethod(heading:string) {
    if (heading === 'Name'){
      this.sortByParam = "name";
      this.sorter.emit("Name");
    } else if (heading === 'Date Range'){
      this.sortByParam = "dateRange";
      this.sorter.emit("DateRange");
    }else if (heading === 'Project'){
      this.sortByParam = "projectName";
      this.sorter.emit("Project");
    } else if (heading === 'Client Name') {
      this.sortByParam = "clientName";
      this.sorter.emit("Client");
    }

  }



  showModal(row: any) {
    this.isModalVisible=true;
    this.timesheetDetail=row;
    const timesheetId='18babdff-c572-4fbc-a102-d6434b7140c3';
    const projectId='7645b7bf-5675-4eb8-ac1d-96b306926422';
    const date =this.entryDate;
    this.timesheetService.getTimeEntries(timesheetId, date,projectId).subscribe(
      (entries)=>{this.timesheetEntries=entries
      });

  }
  timesheetDetailClose(event: boolean){
    this.isModalVisible=false;
  }


  // PageSizeChange(pageSize: number) {
  //   console.log(pageSize);
  //   this.pageSize = pageSize;
  //   this._clientservice
  //     .getWithPagnationResut(this.pageIndex, pageSize, this.searchProject.value)
  //     .subscribe((response: PaginatedResult<Client[]>) => {
  //       this.clientsdata = response.data;
  //       this.pageIndex = response.pagination.pageIndex;
  //       this.pageSize = response.pagination.pageSize;
  //       this.loading = false;

  //     });
  // }

  // PageIndexChange(index: any): void {

  //   if(this.isFilter){
  //    this.clientsdata =this.totalData.slice((index-1)*10,index*10);

  //   }
  //   else{
  //    this.pageIndex = index;
  //    this.loading = true;
  //    if (this.searchProject.value?.length > 1 && this.searchStateFound == true) {
  //      this._clientservice
  //        .getWithPagnationResut(index, 10, this.searchProject.value)
  //        .subscribe((response: PaginatedResult<Client[]>) => {
  //          this.clientsdata = response.data;
  //          this.unfilteredData = response.data;
  //          this.pageIndex = response.pagination.pageIndex;
  //          this.total = response.pagination.totalRecord;

  //          this.totalPage = response.pagination.totalPage;
  //          this.pageSize = response.pagination.pageSize;
  //          this.loading = false;
  //        });


  //    } else {
  //      this._clientservice
  //        .getWithPagnationResut(index, 10)
  //        .subscribe((response: PaginatedResult<Client[]>) => {
  //          this.clientsdata = response.data;
  //          this.unfilteredData = response.data;
  //          this.pageIndex = response.pagination.pageIndex;
  //          this.pageSize = response.pagination.pageSize;
  //          this.loading = false;
  //          if((this.searchAddressList.length > 0) || (this.searchstatusList.length> 0) || (this.searchsalesPersonList.length> 0)){
  //            this.search(
  //              this.searchAddressList,
  //              this.searchstatusList,
  //              this.searchsalesPersonList
  //            );

  //          }


  //        });
  //      this.searchStateFound = false;
  //    }}
  //  }

}



