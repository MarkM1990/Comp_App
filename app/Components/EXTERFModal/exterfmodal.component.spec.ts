import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EXTERFModalComponent } from './exterfmodal.component';

describe('EXTERFModalComponent', () => {
  let component: EXTERFModalComponent;
  let fixture: ComponentFixture<EXTERFModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EXTERFModalComponent]
    });
    fixture = TestBed.createComponent(EXTERFModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
