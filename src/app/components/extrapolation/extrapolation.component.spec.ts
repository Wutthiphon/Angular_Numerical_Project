import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtrapolationComponent } from './extrapolation.component';

describe('ExtrapolationComponent', () => {
  let component: ExtrapolationComponent;
  let fixture: ComponentFixture<ExtrapolationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtrapolationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtrapolationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
