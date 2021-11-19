import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-progress-buttons',
  templateUrl: './progress-buttons.component.html',
  styleUrls: ['./progress-buttons.component.scss']
})
export class ProgressButtonsComponent implements OnInit {

  @Input() isMultiple = true

  @Output() actionType: EventEmitter<string> = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void{
    this.actionType.emit('submit')
  }

  onNext(){
    this.actionType.emit('next')
  }

  onBack(){
    this.actionType.emit('back')
  }

}
