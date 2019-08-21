import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarUmaContaComponent } from './criar-uma-conta.component';

describe('CriarUmaContaComponent', () => {
  let component: CriarUmaContaComponent;
  let fixture: ComponentFixture<CriarUmaContaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarUmaContaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarUmaContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
