import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplineComponent } from './spline.component';

describe('SplineComponent', () => {
  let component: SplineComponent;
  let fixture: ComponentFixture<SplineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SplineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
