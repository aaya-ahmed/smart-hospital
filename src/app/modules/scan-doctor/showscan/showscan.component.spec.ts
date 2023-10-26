import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowscanComponent } from './showscan.component';

describe('ShowscanComponent', () => {
  let component: ShowscanComponent;
  let fixture: ComponentFixture<ShowscanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowscanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowscanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
