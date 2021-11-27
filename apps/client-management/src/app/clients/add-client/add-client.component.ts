import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTabPosition } from 'ng-zorro-antd/tabs';
import { Observable } from 'rxjs';
import { ValidtyAddClientForms } from '../../core';
import { ClientService } from '../../core/services/client.service';
import { AddClientStateService } from '../../core/State/add-client-state.service';

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
  activeTabIndex = 0;
  constructor(
    private router: Router,
    private clientService: ClientService,
    private addClientState: AddClientStateService,
    private notification: NzNotificationService
  ) {}
  ngOnInit(): void {
    this.addClientState.restAddClientState();
    this.validateAddClientFormState$ =
      this.addClientState.validateAddClientFormState();

    this.addClientState
      .validateAddClientFormState()
      .subscribe((res: ValidtyAddClientForms) => {
        this.validateAddClientFormState = res;
      });
  }

  addClient() {
    this.addClientState
      .validateAddClientFormState()
      .subscribe((res: ValidtyAddClientForms) => {
        this.validateAddClientFormState = res;
      });

    this.addButtonClicked = true;
    if (
      this.validateAddClientFormState?.clientDetailsForm == true &&
      this.validateAddClientFormState?.clientLocationForm == true &&
      this.validateAddClientFormState?.comapanyContactFrom == true &&
      this.validateAddClientFormState?.clientContactsForm
    ) {
      this.clientService.addClient();
    }
    // eslint-disable-next-line no-empty
    else {
      if (this.validateAddClientFormState?.clientDetailsForm == false) {
        this.activeTabIndex = 0;
        this.notification.error(     
          'Client Details is mandatory !',
          '', { nzPlacement:"bottomRight" }
        );
      } else if (this.validateAddClientFormState?.clientContactsForm == false) {
        this.activeTabIndex = 1;
        this.notification.error(     
          'Client Contact is mandatory !',
          '', { nzPlacement:"bottomRight" }
        );
      } else if (this.validateAddClientFormState?.comapanyContactFrom == false) {
        this.activeTabIndex = 2;
        this.notification.error(     
          'Company Contact is mandatory !',
          '', { nzPlacement:"bottomRight" }
        );
      } else if (this.validateAddClientFormState?.clientLocationForm == false) {
        this.activeTabIndex = 3;
        this.notification.error(     
          'Client Location is mandatory !',
          '', { nzPlacement:"bottomRight" }
        );
      }
    }
  }

  cancelAddClientPage() {
    this.router.navigateByUrl('clients');
    this.addClientState.restAddClientState();
  }
}
