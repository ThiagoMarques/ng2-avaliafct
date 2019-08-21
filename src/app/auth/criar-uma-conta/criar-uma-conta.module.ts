import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CriarUmaContaRoutingModule } from './criar-uma-conta-routing.module';
import { CriarUmaContaComponent } from './criar-uma-conta.component';

@NgModule({
  imports: [
    CommonModule,
    CriarUmaContaRoutingModule
  ],
  declarations: [CriarUmaContaComponent]
})
export class CriarUmaContaModule { }
