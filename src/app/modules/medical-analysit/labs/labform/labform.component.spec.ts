import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabformComponent } from './labform.component';

describe('LabformComponent', () => {
  let component: LabformComponent;
  let fixture: ComponentFixture<LabformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
