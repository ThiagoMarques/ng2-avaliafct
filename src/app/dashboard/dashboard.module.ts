import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';
import * as highstock from 'highcharts/modules/stock.src';
import { ProgressbarModule } from 'ngx-bootstrap';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from '../shared/service/dashboard.service';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ChartModule,
    ProgressbarModule.forRoot()
  ],
  declarations: [DashboardComponent],
  providers: [
    DashboardService,
    {
      provide: HIGHCHARTS_MODULES,
      // add as factory to your providers
      useFactory: () => [more, exporting, highstock]
    }
  ]
})
export class DashboardModule {}
