import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingComponent } from './reporting.component';

describe('ReportingComponent', () => {
  let component: ReportingComponent;
  let fixture: ComponentFixture<ReportingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReportingComponent]
    });
    fixture = TestBed.createComponent(ReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
