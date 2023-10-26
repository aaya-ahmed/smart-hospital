import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InPatientComponent } from './in-patient.component';

describe('InPatientComponent', () => {
  let component: InPatientComponent;
  let fixture: ComponentFixture<InPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
