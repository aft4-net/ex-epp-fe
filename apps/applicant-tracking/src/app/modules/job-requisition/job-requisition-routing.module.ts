import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecondaryPageTemplateComponent } from '../../shared/components/page-view-templates/secondary-template/secondary-page-template.component';

const routes: Routes = [
  {
    path: '',
    component: SecondaryPageTemplateComponent,
    children: [
      {
        path: '',
        //component: JobRequisitionComponent,
      },
      {
        path: 'create-job-requisition',
        //component: CreateJobRequisitionComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobRequisitionRoutingModule {}
