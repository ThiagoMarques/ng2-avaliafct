import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FaixaComponent } from './faixa.component';

const routes: Routes = [
  {
    path: '',
    component: FaixaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaixaRoutingModule {}
