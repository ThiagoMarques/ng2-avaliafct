import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'abrangencia',
    pathMatch: 'full'
  },
  {
    path: 'abrangencia',
    loadChildren:
      './abrangencia/abrangencia.module#AbrangenciaModule'
  },
  {
    path: 'atributo',
    loadChildren:
      './atributo/atributo.module#AtributoModule'
  },
  {
    path: 'colaborador',
    loadChildren:
      './colaborador/colaborador.module#ColaboradorModule'
  },
  {
    path: 'complexidade',
    loadChildren:
      './complexidade/complexidade.module#ComplexidadeModule'
  },
  {
    path: 'divisao',
    loadChildren:
      './divisao/divisao.module#DivisaoModule'
  },
  {
    path: 'impacto',
    loadChildren:
      './impacto/impacto.module#ImpactoModule'
  },
  {
    path: 'papel',
    loadChildren:
      './papel/papel.module#PapelModule'
  },
  {
    path: 'pesos',
    loadChildren:
      './pesos/pesos.module#PesosModule'
  },
  {
    path: 'projeto',
    loadChildren:
      './projeto/projeto.module#ProjetoModule'
  },
  {
    path: 'referencia',
    loadChildren:
      './referencia/referencia.module#ReferenciaModule'
  },
  {
    path: 'tecnologia',
    loadChildren:
      './tecnologia/tecnologia.module#TecnologiaModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroBaseRoutingModule {}
