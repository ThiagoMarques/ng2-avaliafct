import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContainerListComponent } from './container-list/container-list.component';
import { ContainerEditComponent } from './container-edit/container-edit.component';
import { EntityFormComponent } from './entity-form/entity-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ContainerListComponent
  },
  {
    path: 'create',
    component: EntityFormComponent
  },
  {
    path: 'edit/:id',
    component: ContainerEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColaboradorRoutingModule {}
