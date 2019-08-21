import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FaixaComponent } from './faixa.component';
import { FaixaRoutingModule } from './faixa-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FaixaRoutingModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    ModalModule
  ],
  declarations: [FaixaComponent],
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'}]
})
export class FaixaModule { }
