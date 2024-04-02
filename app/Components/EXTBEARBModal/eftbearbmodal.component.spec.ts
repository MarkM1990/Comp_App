import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EFTBEARBModalComponent } from './eftbearbmodal.component';

describe('EFTBEARBModalComponent', () => {
  let component: EFTBEARBModalComponent;
  let fixture: ComponentFixture<EFTBEARBModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EFTBEARBModalComponent]
    });
    fixture = TestBed.createComponent(EFTBEARBModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
