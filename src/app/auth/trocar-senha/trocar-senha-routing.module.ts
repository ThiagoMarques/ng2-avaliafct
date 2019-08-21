import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrocarSenhaComponent } from './trocar-senha.component';

const routes: Routes = [
  {
    path: '',
    component: TrocarSenhaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrocarSenhaRoutingModule {}
