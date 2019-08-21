import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ImpactoRoutingModule } from './impacto-routing.module';
import { ContainerListComponent } from '../impacto/container-list/container-list.component';
import { ContainerEditComponent } from '../impacto/container-edit/container-edit.component';
import { EntityFormComponent } from '../impacto/entity-form/entity-form.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    ImpactoRoutingModule,
    FormsModule,
    NgxDatatableModule,
    ReactiveFormsModule
  ],
  declarations: [
    ContainerListComponent,
    ContainerEditComponent,
    EntityFormComponent
  ]
})
export class ImpactoModule { }
