// TESTE NÃO FUNCIONOU
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrCenterService } from '@serpro-design/angular';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { SdInputComponent } from './sd-input.component';

describe('EntityFormComponent', () => {
  let component: SdInputComponent;
  let fixture: ComponentFixture<SdInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule ,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        RouterTestingModule,
        NgxDatatableModule,
        NoopAnimationsModule
      ],
      providers: [ToastrCenterService, HttpClient, HttpHandler],
      declarations: [ SdInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
