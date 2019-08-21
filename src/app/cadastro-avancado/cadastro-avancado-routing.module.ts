import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'distribuicao',
    loadChildren:
      './distribuicao-valor/distribuicao.module#DistribuicaoModule'
  },
  {
    path: 'faixas',
    loadChildren:
      './distribuicao-faixa/faixa.module#FaixaModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroAvancadoRoutingModule {}
