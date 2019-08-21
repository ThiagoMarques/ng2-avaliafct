import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AbrangenciaRoutingModule } from './abrangencia-routing.module';
import { ContainerListComponent } from '../abrangencia/container-list/container-list.component';
import { ContainerEditComponent } from '../abrangencia/container-edit/container-edit.component';
import { EntityFormComponent } from '../abrangencia/entity-form/entity-form.component';
import { SharedModule } from '../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    AbrangenciaRoutingModule,
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
export class AbrangenciaModule { }
