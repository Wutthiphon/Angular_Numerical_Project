import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewtonDivideDifferenceComponent } from './newton-divide-difference.component';

describe('NewtonDivideDifferenceComponent', () => {
  let component: NewtonDivideDifferenceComponent;
  let fixture: ComponentFixture<NewtonDivideDifferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewtonDivideDifferenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewtonDivideDifferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
