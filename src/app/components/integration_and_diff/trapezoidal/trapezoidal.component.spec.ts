import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrapezoidalComponent } from './trapezoidal.component';

describe('TrapezoidalComponent', () => {
  let component: TrapezoidalComponent;
  let fixture: ComponentFixture<TrapezoidalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrapezoidalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrapezoidalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
