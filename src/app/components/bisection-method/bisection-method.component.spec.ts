import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BisectionMethodComponent } from './bisection-method.component';

describe('BisectionMethodComponent', () => {
  let component: BisectionMethodComponent;
  let fixture: ComponentFixture<BisectionMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BisectionMethodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BisectionMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
