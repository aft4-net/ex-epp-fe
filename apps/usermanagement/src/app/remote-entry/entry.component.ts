import { Component } from '@angular/core';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';

@Component({
  selector: 'exec-epp-usermanagement-entry',
  template: `<p>ok</p>`,
  styles: [
    `

.employee-name
{
  position: relative;
  font-size: medium;
  font-weight: bold;
  margin-top: 0%;
}
.designation{
  font-size: medium;
  font-weight: bold;
  margin-left: 69%;
  margin-top: -3%;
}
.current-time{
  font-size: small;
  margin-left: 77%;
  margin-top: -1.68%;
}
.card-container {
  flex-wrap: wrap;
}
.feature-card
{
  -webkit-box-shadow: -2px -1px 15px 7px rgba(0,0,0,0.5);
  -moz-box-shadow: -3px -2px 30px 14px rgba(0,0,0,0.425);
  box-shadow: -4px -3px 45px 21px rgba(0,0,0,0.35);
}
p {
  margin: 0;
}

.flex-wrap {
  flex-wrap: wrap;
}
.flex-row {
  flex-direction: row;
}
.flex {
  display: flex;
}

*, :after, :before {
  box-sizing: border-box;
  border: 0 solid #e2e8
}

.nz-icon {
  margin-right: 10px;
}

    `
  ],

})
export class RemoteEntryComponent {}
