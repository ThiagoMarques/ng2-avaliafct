import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoadingCenterModule } from '@serpro-design/angular';


@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    LoadingCenterModule.forRoot()
  ],
  declarations: [],
  providers: []
})
export class AuthModule { }
