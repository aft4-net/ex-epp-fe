import { BehaviorSubject, Observable } from 'rxjs';
import {
  Employee,
  StateService,
  UpdateBillingAddress,
  UpdateClient,
  UpdateClientContact,
  UpdateCompanyContact,
  UpdateOperatingAddress,
  ValidtyAddClientForms,
} from '..';

import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

const iniitalAddClientState: UpdateClient = {
  Guid:'',
  SalesPersonGuid: '',
  ClientStatusGuid: '',
  ClientName: '',
  Description: '',
  ClientContacts: [] as UpdateClientContact[],
  CompanyContacts: [] as UpdateCompanyContact[],
  OperatingAddress: [] as UpdateOperatingAddress[],
  BillingAddress: [] as UpdateBillingAddress[],
};

@Injectable({
  providedIn: 'root',
})
export class UpdateClientStateService extends StateService<UpdateClient> {
  private comapanyContacts = new BehaviorSubject<Employee[]>([] as Employee[]);
   isEdit=false;
   isAdd=false;
   isDefault=false;
   breadCrumb="Add Clients";
   titlePage="Add Client";
   formTitle="Enter Client Details";
   save="Save";
   companyContactEdit:Employee[]=[];
  constructor() {
    super(iniitalAddClientState);
  }

  get getClientcomapanyContacts() {
    return this.comapanyContacts.getValue();
  }

  updateClientcomapanyContacts(employees: Employee[]) {
    this.comapanyContacts.next(employees);
  }
  updateClient(client: UpdateClient) {

    this.setState({
      Guid:client.Guid,
      ClientName: client.ClientName,
      SalesPersonGuid: client.SalesPersonGuid,
      ClientStatusGuid: client.ClientStatusGuid,
      Description: client.Description,
      ClientContacts:client.ClientContacts,
      CompanyContacts:client.CompanyContacts,
      OperatingAddress:client.OperatingAddress,
      BillingAddress:client.BillingAddress,
    });
  }

  get UpdateClientData(): UpdateClient {
    return this.state;
  }

  updateClientContacts(clientCotacts: UpdateClientContact[]) {
    this.setState({ ClientContacts: clientCotacts });
  }

  updateCompanyContacts(CompanyContacts: UpdateCompanyContact[]) {
    this.setState({ CompanyContacts: CompanyContacts });
  }

  updateOperatingAddress(OperatingAddress: UpdateOperatingAddress[]) {
    this.setState({ OperatingAddress: OperatingAddress });
  }

  updateBillingAddress(BillingAddress: UpdateBillingAddress[]) {
    this.setState({ BillingAddress: BillingAddress });
  }
  restUpdateClientState() {
    this.setState(iniitalAddClientState);
  }

  validateUpdateClientFormState(): Observable<ValidtyAddClientForms> {
    // eslint-disable-next-line prefer-const
    let validtyAddClientForms: ValidtyAddClientForms = {
      clientDetailsForm: false,
      clientLocationForm: true,
      clientContactsForm: true,
      CompanyContactsForm: true,
    };

    return this.state$.pipe(
      map((res: UpdateClient) => {
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
        return validtyAddClientForms;
      })
    );
  }
}
