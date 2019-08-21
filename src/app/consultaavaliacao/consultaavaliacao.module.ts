import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartModule } from 'angular-highcharts';
import { ProgressbarModule, CollapseModule } from 'ngx-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContainerListComponent } from './container-list/container-list.component';
import { ContainerEditComponent } from './container-edit/container-edit.component';
import { ConsultaAvaliacaoRoutingModule } from '../consultaavaliacao/consultaavaliacao-routing.module';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import {NgxPrintModule} from 'ngx-print';

@NgModule({
  imports: [
    CommonModule,
    ConsultaAvaliacaoRoutingModule,
    ChartModule,
    CollapseModule,
    NgSelectModule,
    AccordionModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgxPrintModule,
    ProgressbarModule.forRoot()
  ],
  declarations: [
    ContainerListComponent,
    ContainerEditComponent
  ],
  providers: []
})
export class ConsultaAvaliacaoModule {}
