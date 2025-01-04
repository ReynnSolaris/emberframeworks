import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgprimedebugComponent } from './ngprimedebug.component';

describe('NgprimedebugComponent', () => {
  let component: NgprimedebugComponent;
  let fixture: ComponentFixture<NgprimedebugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgprimedebugComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgprimedebugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
