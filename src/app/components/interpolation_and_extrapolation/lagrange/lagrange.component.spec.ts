import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LagrangeComponent } from './lagrange.component';

describe('LagrangeComponent', () => {
  let component: LagrangeComponent;
  let fixture: ComponentFixture<LagrangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LagrangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LagrangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
