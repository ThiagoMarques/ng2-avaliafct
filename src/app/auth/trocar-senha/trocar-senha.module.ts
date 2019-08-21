import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrocarSenhaRoutingModule } from './trocar-senha-routing.module';
import { TrocarSenhaComponent } from './trocar-senha.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingCenterModule } from '@serpro-design/angular';

@NgModule({
  imports: [
    CommonModule,
    TrocarSenhaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingCenterModule.forRoot()
  ],
  declarations: [TrocarSenhaComponent]
})
export class TrocarSenhaModule { }
