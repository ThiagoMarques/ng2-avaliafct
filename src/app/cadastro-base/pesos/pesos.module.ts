import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EntityFormComponent } from './entity-form/entity-form.component';
import { ContainerListComponent } from './container-list/container-list.component';
import { ContainerEditComponent } from './container-edit/container-edit.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PesosRoutingModule } from './pesos-routing.module';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);
@NgModule({
  imports: [
    CommonModule,
    PesosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    NgxDatatableModule,
    PaginationModule.forRoot()
  ],
  declarations: [
    EntityFormComponent,
    ContainerListComponent,
    ContainerEditComponent
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'}]
})
export class PesosModule { }
