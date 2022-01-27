import { Component, OnInit } from '@angular/core';
import { UpdateClientStateService, ValidtyAddClientForms } from '../../core';

import { AddClientStateService } from '../../core/State/add-client-state.service';
import { ClientService } from '../../core/services/client.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTabPosition } from 'ng-zorro-antd/tabs';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'exec-epp-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
})
export class AddClientComponent implements OnInit {
  position: NzTabPosition = 'left';
  validateAddClientFormState$?: Observable<ValidtyAddClientForms>;
  validateAddClientFormState?: ValidtyAddClientForms;
  addButtonClicked = false;
  contactDetailsTabEnabled = false;
  activeTabIndex = 0;
  locationTabEnabled = false;
  constructor(
    private router: Router,
    private clientService: ClientService,
    private addClientState: AddClientStateService,
    public updateClientState: UpdateClientStateService,
    private notification: NzNotificationService,
    private modal: NzModalService
  ) {}
  ngOnInit(): void {
    if(this.updateClientState.isEdit)
    {
      this.validateAddClientFormState$ =
        this.updateClientState.validateUpdateClientFormState();

      this.updateClientState
        .validateUpdateClientFormState()
        .subscribe((res: ValidtyAddClientForms) => {
          this.validateAddClientFormState = res;
        });
    }
    else{
      this.addClientState.restAddClientState();
      this.validateAddClientFormState$ =
        this.addClientState.validateAddClientFormState();


      this.addClientState
        .validateAddClientFormState()
        .subscribe((res: ValidtyAddClientForms) => {
          this.validateAddClientFormState = res;
        });

    }

  }

  addClient() {
    this.addButtonClicked = true;
    if(this.updateClientState.isEdit)
    {
      this.updateClientState
      .validateUpdateClientFormState()
      .subscribe((res: ValidtyAddClientForms) => {
        this.validateAddClientFormState = res;
      });
      if (
        this.validateAddClientFormState?.clientDetailsForm &&
        this.validateAddClientFormState?.clientLocationForm &&
        this.validateAddClientFormState?.clientContactsForm &&
        this.validateAddClientFormState?.clientContactsForm &&
        this.updateClientState.UpdateClientData!=null
      ) {
        console.log('updating')
        console.log(this.updateClientState.UpdateClientData);
        this.clientService.updateClient(this.updateClientState.UpdateClientData).subscribe(
          ()=>{
            this.notification.success('Client Updated Successfully', '', {
              nzPlacement: 'bottomRight',
            });
            this.router.navigateByUrl('clients');
          },
          ()=>{
            this.notification.error('Client not Updated!', '', {
              nzPlacement: 'bottomRight',
            });
          }
        );

      }
      // eslint-disable-next-line no-empty
      else {
        if (this.validateAddClientFormState?.clientDetailsForm == false) {
          this.activeTabIndex = 0;
          this.notification.error('Client details is mandatory !', '', {
            nzPlacement: 'bottomRight',
          });
        } else if (
          this.validateAddClientFormState?.clientContactsForm == false ||
          this.validateAddClientFormState?.CompanyContactsForm == false
        ) {
          this.contactDetailsTabEnabled = true;
          if (this.validateAddClientFormState?.clientContactsForm == false) {
            this.activeTabIndex = 2;
            this.notification.error('Client Contacts is mandatory !', '', {
              nzPlacement: 'bottomRight',
            });
          } else {
            this.activeTabIndex = 3;
            this.notification.error('Company Contacts is mandatory !', '', {
              nzPlacement: 'bottomRight',
            });
          }
        } else if (this.validateAddClientFormState?.clientLocationForm == false) {
          this.locationTabEnabled = true;
          if (this.contactDetailsTabEnabled) this.activeTabIndex = 5;
          else this.activeTabIndex = 3;
          this.notification.error('Client location is mandatory !', '', {
            nzPlacement: 'bottomRight',
          });
        }
      }

    }
    else{
    this.addClientState
      .validateAddClientFormState()
      .subscribe((res: ValidtyAddClientForms) => {
        this.validateAddClientFormState = res;
      });


    if (
      this.validateAddClientFormState?.clientDetailsForm &&
      this.validateAddClientFormState?.clientLocationForm &&
      this.validateAddClientFormState?.clientContactsForm &&
      this.validateAddClientFormState?.clientContactsForm
    ) {
      console.log("checking the client")
      console.log(this.addClientState.addClientData)
      this.router.navigateByUrl('clientmanagement');
      this.clientService.addClient();
    }
    // eslint-disable-next-line no-empty
    else {
      if (this.validateAddClientFormState?.clientDetailsForm == false) {
        this.activeTabIndex = 0;
        this.notification.error('Client details is mandatory !', '', {
          nzPlacement: 'bottomRight',
        });
      } else if (
        this.validateAddClientFormState?.clientContactsForm == false ||
        this.validateAddClientFormState?.CompanyContactsForm == false
      ) {
        this.contactDetailsTabEnabled = true;
        if (this.validateAddClientFormState?.clientContactsForm == false) {
          this.activeTabIndex = 2;
          this.notification.error('Client Contacts is mandatory !', '', {
            nzPlacement: 'bottomRight',
          });
        } else {
          this.activeTabIndex = 3;
          this.notification.error('Company Contacts is mandatory !', '', {
            nzPlacement: 'bottomRight',
          });
        }
      } else if (this.validateAddClientFormState?.clientLocationForm == false) {
        this.locationTabEnabled = true;
        if (this.contactDetailsTabEnabled) this.activeTabIndex = 5;
        else this.activeTabIndex = 3;
        this.notification.error('Client location is mandatory !', '', {
          nzPlacement: 'bottomRight',
        });
      }
    }
  }
  }

  cancelAddClientPage() {
    this.cancelConfirm();
    this.updateClientState.isEdit=false;
    this.updateClientState.isAdd=false;
    this.updateClientState.save='Save';
    this.updateClientState.breadCrumb='Add Clients';
    this.updateClientState.titlePage='Add Client';
    this.updateClientState.formTitle='Enter Client Details';
    this.updateClientState.restUpdateClientState();
  }

  cancelConfirm(): void {
    if (
      this.validateAddClientFormState?.clientDetailsForm ||
      this.validateAddClientFormState?.clientLocationForm ||
      this.validateAddClientFormState?.clientContactsForm ||
      this.validateAddClientFormState?.CompanyContactsForm
    )
      this.modal.confirm({
        nzTitle: 'Are you sure, you want to cancel ?',

        nzCancelText: 'No',
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        nzOnCancel: () => {},
        nzOkText: 'Yes',
        nzOkDanger: true,

        nzOnOk: () => {
          this.router.navigateByUrl('clientmanagement');
          this.addClientState.restAddClientState();
        },
      });
    else this.router.navigateByUrl('clientmanagement');
  }
  ClientContacTab() {
    if (this.contactDetailsTabEnabled == false) {
      this.contactDetailsTabEnabled = true;
      this.activeTabIndex = 2;
    } else {
      this.contactDetailsTabEnabled = false;
      this.activeTabIndex = 0;
    }
  }

  LocationTab() {
    if (this.locationTabEnabled == false) {
      this.locationTabEnabled = true;
      if (this.contactDetailsTabEnabled) this.activeTabIndex = 5;
      else this.activeTabIndex = 3;
    } else {

      this.locationTabEnabled = false;
      if (this.contactDetailsTabEnabled == true) this.activeTabIndex = 3;
      else this.activeTabIndex = -3;

    }

  }
}
