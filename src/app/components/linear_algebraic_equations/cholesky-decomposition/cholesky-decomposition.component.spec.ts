import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CholeskyDecompositionComponent } from './cholesky-decomposition.component';

describe('CholeskyDecompositionComponent', () => {
  let component: CholeskyDecompositionComponent;
  let fixture: ComponentFixture<CholeskyDecompositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CholeskyDecompositionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CholeskyDecompositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
