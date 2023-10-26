import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReversePatientComponent } from './reverse-patient.component';

describe('ReversePatientComponent', () => {
  let component: ReversePatientComponent;
  let fixture: ComponentFixture<ReversePatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReversePatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReversePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
