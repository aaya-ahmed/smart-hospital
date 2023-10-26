import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVitalComponent } from './show-vital.component';

describe('ShowVitalComponent', () => {
  let component: ShowVitalComponent;
  let fixture: ComponentFixture<ShowVitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowVitalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowVitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
