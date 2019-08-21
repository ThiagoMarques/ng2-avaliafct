import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask';


@NgModule({
  imports: [CommonModule, LoginRoutingModule, NgxMaskModule.forRoot(), FormsModule, ReactiveFormsModule],
  declarations: [LoginComponent]
})
export class LoginModule {}
