import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanDoctorComponent } from './scan-doctor.component';

describe('ScanDoctorComponent', () => {
  let component: ScanDoctorComponent;
  let fixture: ComponentFixture<ScanDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScanDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
