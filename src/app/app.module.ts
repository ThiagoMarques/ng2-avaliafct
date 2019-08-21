import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AlertCenterModule, SerproDesignModule, LoadingCenterModule, ToastrCenterModule } from '@serpro-design/angular';
import { StorageServiceModule } from 'angular-webstorage-service';
import { NgrxFormsModule } from 'ngrx-forms';
import { AppRoutingModule } from './app-routing.module';
import { AppShellComponent } from './app-shell/app-shell.component';
import { AppComponent } from './app.component';
import { AboutComponent } from './pages/about/about.component';
import { ExemploNgrxFormsComponent } from './pages/exemplo-ngrx-forms/exemplo-ngrx-forms.component';
import { ExemploStoreComponent } from './pages/exemplo-store/exemplo-store.component';
import { counterReducer } from './store/counter.reducer';
import { sampleFormReducer } from './store/sampleForm.reducer';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap';
import { JwtInterceptor } from './auth/interceptor.module';
import { ErrorInterceptor } from './auth/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AppShellComponent,
    AboutComponent,
    ExemploStoreComponent,
    ExemploNgrxFormsComponent
  ],
  imports: [
    BrowserModule,
    CollapseModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SerproDesignModule.forRoot(),
    AlertCenterModule.forRoot(),
    AppRoutingModule,
    StorageServiceModule,
    FormsModule,
    ReactiveFormsModule,
    NgrxFormsModule,
    StoreModule.forRoot({
      counter: counterReducer,
      sampleForm: sampleFormReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    ModalModule,
    ToastrCenterModule.forRoot(),
    LoadingCenterModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
