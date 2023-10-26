import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalAnalysitComponent } from './medical-analysit.component';

describe('MedicalAnalysitComponent', () => {
  let component: MedicalAnalysitComponent;
  let fixture: ComponentFixture<MedicalAnalysitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalAnalysitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalAnalysitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
