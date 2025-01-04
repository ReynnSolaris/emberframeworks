import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModpageComponent } from './modpage.component';

describe('ModpageComponent', () => {
  let component: ModpageComponent;
  let fixture: ComponentFixture<ModpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
