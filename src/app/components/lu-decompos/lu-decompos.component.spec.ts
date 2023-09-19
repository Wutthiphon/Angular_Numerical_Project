import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LUDecomposComponent } from './lu-decompos.component';

describe('LUDecomposComponent', () => {
  let component: LUDecomposComponent;
  let fixture: ComponentFixture<LUDecomposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LUDecomposComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LUDecomposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
