import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LIFERFModalComponent } from './liferfmodal.component';

describe('LIFERFModalComponent', () => {
  let component: LIFERFModalComponent;
  let fixture: ComponentFixture<LIFERFModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LIFERFModalComponent]
    });
    fixture = TestBed.createComponent(LIFERFModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
