import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnePointIterationComponent } from './one-point-iteration.component';

describe('OnePointIterationComponent', () => {
  let component: OnePointIterationComponent;
  let fixture: ComponentFixture<OnePointIterationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnePointIterationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnePointIterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
