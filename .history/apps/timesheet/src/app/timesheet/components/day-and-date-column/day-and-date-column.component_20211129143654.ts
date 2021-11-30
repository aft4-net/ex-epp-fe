import { Component, Input, OnInit, Output, EventEmitter, OnChanges, AfterViewInit, Directive, ElementRef, QueryList, ViewChildren, TemplateRef, ViewChild } from '@angular/core';
import { DateColumnEvent, TimeEntryEvent } from '../../../models/clickEventEmitObjectType';
import { ClickEventType } from '../../../models/clickEventType';
import { TimeEntry, Timesheet } from '../../../models/timesheetModels';
import { TimesheetService } from '../../services/timesheet.service';
import { ProjectNamePaletComponent } from '../project-name-palet/project-name-palet.component';

@Directive({
  selector:'[entries]',
})
export class DayAndDateDirective{
constructor(public elRef:ElementRef){

}
}
@Component({
  selector: 'app-day-and-date-column',
  templateUrl: './day-and-date-column.component.html',
  styleUrls: ['./day-and-date-column.component.scss']
})
export class DayAndDateColumnComponent implements OnInit, OnChanges,AfterViewInit {

  @Output() dateColumnClicked = new EventEmitter<DateColumnEvent>();
  @Output() projectNamePaletClicked = new EventEmitter<TimeEntryEvent>();
  @Output() paletEllipsisClicked = new EventEmitter<TimeEntryEvent>();
  @Output() editButtonClicked = new EventEmitter<ClickEventType>();
  @Output() totalHoursCalculated = new EventEmitter<number>();
  @Input() item: any; // decorate the property with @Input()
  @Input() dates1: any; // decorate the property with @Input()
  @Input() date: Date = new Date();
  @Input() timesheet: Timesheet | null = null;
  @Output() moreTimeEntries: EventEmitter<number> = new EventEmitter();
  //@ViewChildren('entries') entries!: QueryList<TemplateRef<DayAndDateColumnComponent>>;
   @ViewChildren('entries')  entriesDiv!: QueryList<ElementRef>;
   @ViewChild("btn") btnEl!: ElementRef;
  timeEntrys: TimeEntry[] | null = null;
  totalHours: number = 0;
  morePopover = false;
  index?: number = 0;
  overflow = false;
  moreEntries: any[] = [];
  overflowPt: any;
  of: any;
  constructor(private timesheetService: TimesheetService) {
  }
  ngAfterViewInit(): void {
  debugger; 
  
  }
  getOf():void{
    if(this.entriesDiv){
      const list=this.entriesDiv.toArray();
      let btn=this.btnEl.nativeElement.getBoundingClientRect
     this.of=this.entriesDiv.filter(elt=>elt.nativeElement.parent.getBoundingClientRect().bottom==document.getElementById('btn')!.getBoundingClientRect().top);
     debugger;
      this.overflowPt=list.findIndex(elt=>elt.nativeElement.getBoundingClientRect().bottom==document.getElementById('btn')!.getBoundingClientRect().top);this.split(this.overflowPt);
      
      console.log(this.of.findIndex)
    //  console.log(this.entriesDiv.nativeElement.getBoundingClientRect().bottom)
      }
  }
  

  clickEventType = ClickEventType.none;

   ngOnInit(): void {
    
    this.getOf();
    
  }

  ngOnChanges(): void {
    if(this.entriesDiv){
    const list=this.entriesDiv.toArray();
    debugger;
    let of=this.entriesDiv.filter(elt=>elt.nativeElement.parent.getBoundingClientRect().bottom==document.getElementById('btn')!.getBoundingClientRect().top);
     this.overflowPt=list.findIndex(elt=>elt.nativeElement.getBoundingClientRect().bottom==document.getElementById('btn')!.getBoundingClientRect().top);
     this.split(this.overflowPt);
    }
    if (this.timesheet) {
      this.timesheetService.getTimeEntries(this.timesheet.Guid, this.date).subscribe(response => {
        this.timeEntrys = response ? response : null;

        if (this.timesheet) {
          let totalHours = this.timeEntrys?.map(timeEntry => timeEntry.Hour).reduce((prev, next) => prev + next, 0);
          this.totalHours = totalHours ? totalHours : 0;
          this.totalHoursCalculated.emit(totalHours);
        }
      });
    }
  }

  onProjectNamePaletClicked(timeEntryEvent: TimeEntryEvent) {
    if (this.clickEventType === ClickEventType.none) {
      this.clickEventType = timeEntryEvent.clickEventType
      this.projectNamePaletClicked.emit(timeEntryEvent);
    }

    if(this.morePopover){
      this.clickEventType = ClickEventType.none;
    }
  }

  onPaletEllipsisClicked(timeEntryEvent: TimeEntryEvent) {
    if (this.clickEventType === ClickEventType.none) {
      this.clickEventType = timeEntryEvent.clickEventType;
      this.paletEllipsisClicked.emit(timeEntryEvent);
    }

    if (this.morePopover) {
      this.clickEventType = ClickEventType.none;
    }
  }

  onEditButtonClicked(clickEventType: ClickEventType) {
    if (this.clickEventType === ClickEventType.none) {
      this.clickEventType = clickEventType;
      this.editButtonClicked.emit(this.clickEventType);
    }

    this.clickEventType = ClickEventType.none;
  }

  showFormDrawer() {
    if (this.clickEventType === ClickEventType.none) {
      this.clickEventType = ClickEventType.showFormDrawer;
      let dateColumnEvent: DateColumnEvent = {
        clickEventType: this.clickEventType,
        totalHours: this.totalHours
      }
      this.dateColumnClicked.emit(dateColumnEvent);
    }

    this.clickEventType = ClickEventType.none;
  }

  onClick() {
    this.clickEventType = ClickEventType.showPaletPopover;
    this.morePopover = true;
  }

  checkOverflow(el: HTMLElement, index?: number) {
    if (el.offsetHeight < el.scrollHeight) {
      this.index ? index : null;
      this.overflow = true;
      el.style.overflow = "hidden";
      if(this.overflowPt>1){
        this.split(index!);
      }
    }

    return el.offsetHeight < el.scrollHeight;
  }

  split(index: number) {

    if(this.timeEntrys!==null) {
      for (let i = index; i < this.timeEntrys.length; i++) {
        for (let j = 0; j <= this.timeEntrys.length - index; j++) {
          this.moreEntries[j] = this.timeEntrys[i];
          i++;
        }
      }
    }
        return this.moreEntries;
  
}
}


