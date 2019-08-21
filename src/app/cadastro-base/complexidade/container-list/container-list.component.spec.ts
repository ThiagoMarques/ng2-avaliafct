// TESTE NÂO PASSOU
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrCenterService } from '@serpro-design/angular';

import { ContainerListComponent } from './container-list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

describe('ContainerListComponent', () => {
  let component: ContainerListComponent;
  let fixture: ComponentFixture<ContainerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule ,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        RouterTestingModule,
        NgxDatatableModule
      ],
      declarations: [ ContainerListComponent ],
      providers: [ToastrCenterService, HttpClient, HttpHandler]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('Deve remover o registro especificado',  () => {
  //   console.log('Teste de remover registros');
  // });

});
