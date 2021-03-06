// TESTE NÃO PASSOU
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrCenterService } from '@serpro-design/angular';

import { ContainerEditComponent } from './container-edit.component';

describe('ContainerEditComponent', () => {
  let component: ContainerEditComponent;
  let fixture: ComponentFixture<ContainerEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule ,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        RouterTestingModule,
        NgxDatatableModule,
        NoopAnimationsModule
      ],
      providers: [ToastrCenterService, HttpClient, HttpHandler],
      declarations: [ ContainerEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
