import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriarUmaContaComponent } from './criar-uma-conta.component';

const routes: Routes = [
  {
    path: '',
    component: CriarUmaContaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CriarUmaContaRoutingModule {}
