import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroBaseRoutingModule } from './cadastro-base-routing.module';
import { AbrangenciaService } from './abrangencia/services/abrangencia.service';
import { LoadingCenterModule } from '@serpro-design/angular';


@NgModule({
  imports: [
    CommonModule,
    CadastroBaseRoutingModule,
    LoadingCenterModule.forRoot()
  ],
  declarations: [],
  providers: [AbrangenciaService]
})
export class CadastroBaseModule { }
