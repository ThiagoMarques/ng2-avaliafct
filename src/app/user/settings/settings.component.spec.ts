import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  SerproDesignModule,
  ThemeSelectorService
} from '@serpro-design/angular';
import {
  LOCAL_STORAGE,
  StorageServiceModule
} from 'angular-webstorage-service';
import { SettingsComponent } from './settings.component';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SerproDesignModule, StorageServiceModule],
      declarations: [SettingsComponent],
      providers: [ThemeSelectorService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
