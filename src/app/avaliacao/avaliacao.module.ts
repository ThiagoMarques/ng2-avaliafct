import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import { ProgressbarModule } from 'ngx-bootstrap';
import { AvaliacaoRoutingModule } from './avaliacao-routing.module';
import { AvaliacaoComponent } from './avaliacao.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgSelectizeModule} from 'ng-selectize';

@NgModule({
  imports: [
    CommonModule,
    AvaliacaoRoutingModule,
    ChartModule,
    NgSelectModule,
    NgSelectizeModule,
    FormsModule,
    ReactiveFormsModule,
    ProgressbarModule.forRoot()
  ],
  declarations: [AvaliacaoComponent],
  providers: []
})
export class AvaliacaoModule {}
