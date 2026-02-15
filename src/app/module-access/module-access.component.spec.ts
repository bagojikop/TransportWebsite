import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleAccessComponent } from './module-access.component';

describe('ModuleAccessComponent', () => {
  let component: ModuleAccessComponent;
  let fixture: ComponentFixture<ModuleAccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModuleAccessComponent]
    });
    fixture = TestBed.createComponent(ModuleAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
