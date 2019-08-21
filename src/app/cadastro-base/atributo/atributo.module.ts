import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AtributoRoutingModule } from './atributo-routing.module';
import { ContainerListComponent } from '../atributo/container-list/container-list.component';
import { ContainerEditComponent } from '../atributo/container-edit/container-edit.component';
import { EntityFormComponent } from '../atributo/entity-form/entity-form.component';
import { SharedModule } from '../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FilterPipe } from '../../shared/pipes/filter';

@NgModule({
  imports: [
    CommonModule,
    AtributoRoutingModule,
    FormsModule,
    SharedModule,
    NgxDatatableModule,
    ReactiveFormsModule
  ],
  declarations: [
    ContainerListComponent,
    ContainerEditComponent,
    EntityFormComponent,
    FilterPipe
  ]
})
export class AtributoModule { }
