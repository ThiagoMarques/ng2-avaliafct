import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EntityFormComponent } from './entity-form/entity-form.component';
import { ContainerListComponent } from './container-list/container-list.component';
import { ContainerEditComponent } from './container-edit/container-edit.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DistribuicaoRoutingModule } from './distribuicao-routing.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    DistribuicaoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    SharedModule,
    NgxDatatableModule,
    PaginationModule.forRoot(),
  ],
  declarations: [
    EntityFormComponent,
    ContainerListComponent,
    ContainerEditComponent,
    ContainerEditComponent
  ],
  providers: []
})
export class DistribuicaoModule { }
