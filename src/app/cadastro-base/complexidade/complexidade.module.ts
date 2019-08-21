import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComplexidadeRoutingModule } from './complexidade-routing.module';
import { ContainerListComponent } from '../complexidade/container-list/container-list.component';
import { ContainerEditComponent } from '../complexidade/container-edit/container-edit.component';
import { EntityFormComponent } from '../complexidade/entity-form/entity-form.component';
import { SharedModule } from '../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    ComplexidadeRoutingModule,
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
export class ComplexidadeModule { }
