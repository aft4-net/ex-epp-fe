import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {

  BillingAddressCreate,
  ClientContactCreate,
  ClientCreate,
  ClientDetailCreate,
  CompanyContactCreate,
  OperatingAddressCreate,
  StateService,
  ValidtyAddClientForms,
} from '..';


const iniitalAddClientState: ClientCreate = {
  SalesPersonGuid: '',
  ClientStatusGuid: '',
  ClientName: '',
  Description: '',
  ClientContact: [] as ClientContactCreate[],
  CompanyContacts: [] as CompanyContactCreate[],
  OperatingAddress: [] as OperatingAddressCreate[],
  BillingAddress: [] as BillingAddressCreate[],
};
@Injectable({
  providedIn: 'root',
})
export class AddClientStateService extends StateService<ClientCreate> {
  constructor() {
    super(iniitalAddClientState);
  }

  updateAddClientDetails(clientDetail: ClientDetailCreate) {
    this.setState({
      ClientName: clientDetail.ClientName,
      SalesPersonGuid: clientDetail.ClientStatusGuid,
      ClientStatusGuid: clientDetail.ClientStatusGuid,
      Description: clientDetail.Description,
    });
  }

  restAddClientDetails() {
    this.setState({
      ClientName: '',
      SalesPersonGuid: '',
      ClientStatusGuid: '',
      Description: '',
    });
  }

  get addClientData(): ClientCreate {
    return this.state;
  }

  updateClientContacts(clientCotacts: ClientContactCreate[]) {
    this.setState({ ClientContact: clientCotacts });
  }

  updateCompanyContacts(CompanyContacts: CompanyContactCreate[]) {
    this.setState({ CompanyContacts: CompanyContacts });
  }

  updateOperatingAddress(OperatingAddress: OperatingAddressCreate[]) {
    this.setState({ OperatingAddress: OperatingAddress });
  }

  updateBillingAddress(BillingAddress: BillingAddressCreate[]) {
    this.setState({ BillingAddress: BillingAddress });
  }
  restAddClientState() {
    this.setState(iniitalAddClientState);
  }

  validateAddClientFormState(): Observable<ValidtyAddClientForms> {
    // eslint-disable-next-line prefer-const
    let validtyAddClientForms: ValidtyAddClientForms = {
      clientDetailsForm: false,
      contactDetailsForm: false,
      clientLocationForm: false,
    };

    return this.state$.pipe(
      map((res: ClientCreate) => {
        if (
          typeof res.ClientName !== 'undefined' &&
          res.ClientName !== '' &&
          typeof res.ClientStatusGuid !== 'undefined' &&
          res.ClientStatusGuid !== '' &&
          typeof res.SalesPersonGuid !== 'undefined' &&
          res.SalesPersonGuid !== ''
        )
          validtyAddClientForms.clientDetailsForm = true;
        else {
          validtyAddClientForms.clientDetailsForm = false;
        }

        if (res.BillingAddress.length >= 1 && res.OperatingAddress.length >= 1)
          validtyAddClientForms.clientLocationForm = true;
        else validtyAddClientForms.clientLocationForm = false;

        if (res.ClientContact.length >= 1 && res.CompanyContacts.length >= 1)
          validtyAddClientForms.contactDetailsForm = true;
        else validtyAddClientForms.contactDetailsForm = false;

        return validtyAddClientForms;
      })
    );
  }
}
