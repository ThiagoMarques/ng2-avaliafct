import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from '../../store/counter.reducer';
import { ExemploStoreComponent } from './exemplo-store.component';

describe('ExemploStoreComponent', () => {
  let component: ExemploStoreComponent;
  let fixture: ComponentFixture<ExemploStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          counter: counterReducer
          // sampleForm: sampleFormReducer
        })
      ],
      declarations: [ExemploStoreComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExemploStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
