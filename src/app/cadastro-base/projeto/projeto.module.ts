import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EntityFormComponent } from './entity-form/entity-form.component';
import { ContainerListComponent } from './container-list/container-list.component';
import { ContainerEditComponent } from './container-edit/container-edit.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ProjetoRoutingModule } from './projeto-routing.module';
import {NgxMaskModule} from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    ProjetoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    NgxDatatableModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    NgxMaskModule.forRoot()
  ],
  declarations: [
    EntityFormComponent,
    ContainerListComponent,
    ContainerEditComponent
  ],
  providers: [DatePipe]
})
export class ProjetoModule { }
