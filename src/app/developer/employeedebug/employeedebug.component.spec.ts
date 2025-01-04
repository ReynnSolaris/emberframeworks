import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeedebugComponent } from './employeedebug.component';

describe('EmployeedebugComponent', () => {
  let component: EmployeedebugComponent;
  let fixture: ComponentFixture<EmployeedebugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeedebugComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeedebugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
