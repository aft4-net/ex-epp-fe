import { Component } from '@angular/core';

@Component({
  selector: 'exec-epp-timesheet-entry',
  template: `<div class="remote-entry">
    <h2>timesheet's Remote Entry Component</h2>
  </div>`,
  styles: [
    `
      .remote-entry {
        background-color: #143055;
        color: white;
        padding: 5px;
      }
    `,
  ],
})
export class RemoteEntryComponent {
  constructor() {
    let userId = "c0b74644-b81a-4c33-a6b0-672ba4bc8cb2";
    localStorage.setItem("userId", userId);

    let supervisorId = "1b38f8be-e7dc-495f-ace3-c87f2332b063";
    localStorage.setItem("supervisorId", supervisorId);
  }
}
