import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { ExemploNgxFormlyComponent } from './exemplo-ngx-formly.component';

const routes: Routes = [
  {
    path: '',
    component: ExemploNgxFormlyComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule.forChild({
      validationMessages: [
        { name: 'required', message: 'Campo obrigatório.' },
      ],
    }),
    FormlyBootstrapModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ExemploNgxFormlyComponent]
})
export class ExemploNgxFormlyModule {}
