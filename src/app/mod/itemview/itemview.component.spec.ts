import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemviewComponent } from './itemview.component';

describe('ItemviewComponent', () => {
  let component: ItemviewComponent;
  let fixture: ComponentFixture<ItemviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
