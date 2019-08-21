import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertCenterModule, SerproDesignModule } from '@serpro-design/angular';
import { AppShellComponent } from './app-shell.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AppShellComponent', () => {
  let component: AppShellComponent;
  let fixture: ComponentFixture<AppShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SerproDesignModule.forRoot(),
        AlertCenterModule.forRoot(),
        RouterTestingModule,
        NoopAnimationsModule
      ],
      declarations: [AppShellComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
