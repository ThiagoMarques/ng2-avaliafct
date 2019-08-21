import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { NgrxFormsModule } from 'ngrx-forms';
import { sampleFormReducer } from '../../store/sampleForm.reducer';
import { ExemploNgrxFormsComponent } from './exemplo-ngrx-forms.component';

describe('ExemploNgrxFormsComponent', () => {
  let component: ExemploNgrxFormsComponent;
  let fixture: ComponentFixture<ExemploNgrxFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgrxFormsModule,
        StoreModule.forRoot({
          // counter: counterReducer
          sampleForm: sampleFormReducer
        })
      ],
      declarations: [ExemploNgrxFormsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExemploNgrxFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
