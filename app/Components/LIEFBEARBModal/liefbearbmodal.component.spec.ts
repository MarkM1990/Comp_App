import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LIEFBEARBModalComponent } from './liefbearbmodal.component';

describe('LIEFBEARBModalComponent', () => {
  let component: LIEFBEARBModalComponent;
  let fixture: ComponentFixture<LIEFBEARBModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LIEFBEARBModalComponent]
    });
    fixture = TestBed.createComponent(LIEFBEARBModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
