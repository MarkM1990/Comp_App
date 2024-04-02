import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LieferListComponent } from './liefer-list.component';

describe('LieferListComponent', () => {
  let component: LieferListComponent;
  let fixture: ComponentFixture<LieferListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LieferListComponent]
    });
    fixture = TestBed.createComponent(LieferListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
