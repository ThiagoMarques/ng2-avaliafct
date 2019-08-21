import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { ExemploNgxFormlyComponent } from './exemplo-ngx-formly.component';

describe('ExemploNgxFormlyComponent', () => {
  let component: ExemploNgxFormlyComponent;
  let fixture: ComponentFixture<ExemploNgxFormlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormlyModule.forChild({
          validationMessages: [
            { name: 'required', message: 'Campo obrigatório.' }
          ]
        }),
        FormlyBootstrapModule
      ],
      declarations: [ExemploNgxFormlyComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExemploNgxFormlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
