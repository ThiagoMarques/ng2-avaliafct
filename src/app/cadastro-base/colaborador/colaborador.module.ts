import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColaboradorRoutingModule } from './colaborador-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContainerListComponent } from '../colaborador/container-list/container-list.component';
import { ContainerEditComponent } from '../colaborador/container-edit/container-edit.component';
import { EntityFormComponent } from '../colaborador/entity-form/entity-form.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SharedModule } from '../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToastrCenterModule } from '@serpro-design/angular';
import {NgxMaskModule} from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    ColaboradorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxDatatableModule,
    ToastrCenterModule.forRoot(),
    PaginationModule.forRoot(),
    NgxMaskModule.forRoot()
  ],
  declarations: [
    ContainerListComponent,
    ContainerEditComponent,
    EntityFormComponent
  ]
})
export class ColaboradorModule { }
