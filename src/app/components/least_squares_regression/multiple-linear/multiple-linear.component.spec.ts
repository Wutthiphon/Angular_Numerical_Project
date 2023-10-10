import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleLinearComponent } from './multiple-linear.component';

describe('MultipleLinearComponent', () => {
  let component: MultipleLinearComponent;
  let fixture: ComponentFixture<MultipleLinearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleLinearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleLinearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
