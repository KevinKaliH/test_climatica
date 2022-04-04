import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterViewComponent } from 'src/app/shared/components/router-view/router-view.component';
import { ProducersComponent } from './producers.component';
import { EditComponent } from './edit/edit.component';
import { NewComponent } from './new/new.component';
import { DxButtonModule, DxDataGridModule, DxFormModule, DxResponsiveBoxModule } from 'devextreme-angular';

const routes: Routes = [
  {
    path: 'producers',
    component: RouterViewComponent,
    children: [
      {
        path: '',
        component: ProducersComponent,
      },
      {
        path: 'new',
        component: NewComponent,
      },
      {
        path: 'edit',
        component: EditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    DxDataGridModule,
    DxFormModule,
    DxResponsiveBoxModule,
    DxButtonModule,
  ],
  exports: [RouterModule],
  declarations: [NewComponent, EditComponent, ProducersComponent],
})
export class ProducersRoutingModule {}
