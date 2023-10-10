import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaussSeidelIterationComponent } from './gauss-seidel-iteration.component';

describe('GaussSeidelIterationComponent', () => {
  let component: GaussSeidelIterationComponent;
  let fixture: ComponentFixture<GaussSeidelIterationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaussSeidelIterationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GaussSeidelIterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
