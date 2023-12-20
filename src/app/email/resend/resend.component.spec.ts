import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResendComponent } from './resend.component';

describe('ResendComponent', () => {
  let component: ResendComponent;
  let fixture: ComponentFixture<ResendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResendComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
