import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartModule } from 'angular-highcharts';
import { ProgressbarModule } from 'ngx-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SobreRoutingModule } from './sobre-routing.module';
import { SobreComponent } from './sobre.component';

@NgModule({
  imports: [
    CommonModule,
    SobreRoutingModule,
    ChartModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    ProgressbarModule.forRoot()
  ],
  declarations: [
    SobreComponent
  ],
  providers: []
})
export class SobreModule {}
