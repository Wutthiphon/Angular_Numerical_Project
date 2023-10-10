import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConjugateGradientComponent } from './conjugate-gradient.component';

describe('ConjugateGradientComponent', () => {
  let component: ConjugateGradientComponent;
  let fixture: ComponentFixture<ConjugateGradientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConjugateGradientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConjugateGradientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
