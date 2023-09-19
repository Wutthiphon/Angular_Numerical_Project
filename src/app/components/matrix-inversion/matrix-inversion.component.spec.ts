import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixInversionComponent } from './matrix-inversion.component';

describe('MatrixInversionComponent', () => {
  let component: MatrixInversionComponent;
  let fixture: ComponentFixture<MatrixInversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatrixInversionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatrixInversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
