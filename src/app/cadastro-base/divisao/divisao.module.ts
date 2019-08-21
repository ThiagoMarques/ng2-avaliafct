import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DivisaoRoutingModule } from './divisao-routing.module';
import { ContainerListComponent } from '../divisao/container-list/container-list.component';
import { ContainerEditComponent } from '../divisao/container-edit/container-edit.component';
import { EntityFormComponent } from '../divisao/entity-form/entity-form.component';
import { SharedModule } from '../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    DivisaoRoutingModule,
    FormsModule,
    SharedModule,
    NgxDatatableModule,
    ReactiveFormsModule
  ],
  declarations: [
    ContainerListComponent,
    ContainerEditComponent,
    EntityFormComponent
  ]
})
export class DivisaoModule { }
