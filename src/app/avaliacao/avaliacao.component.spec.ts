import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProgressbarModule } from 'ngx-bootstrap';
import { AvaliacaoComponent } from './avaliacao.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgSelectizeModule } from 'ng-selectize';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastrCenterService } from '@serpro-design/angular';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';

describe('Avaliacao', () => {
  let component: AvaliacaoComponent;
  let fixture: ComponentFixture<AvaliacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        ProgressbarModule.forRoot(),
        NgSelectModule,
        NgSelectizeModule,
        ToastrModule.forRoot(),
        RouterTestingModule
      ],
      declarations: [AvaliacaoComponent],
      providers: [ ToastrCenterService, HttpClient, HttpHandler ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaliacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
