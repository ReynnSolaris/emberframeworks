import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentModalComponent } from './incident-modal.component';

describe('IncidentModalComponent', () => {
  let component: IncidentModalComponent;
  let fixture: ComponentFixture<IncidentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncidentModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IncidentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
