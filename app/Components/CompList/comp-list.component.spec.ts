import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompListComponent } from './comp-list.component';

describe('CompListComponent', () => {
  let component: CompListComponent;
  let fixture: ComponentFixture<CompListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompListComponent]
    });
    fixture = TestBed.createComponent(CompListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
