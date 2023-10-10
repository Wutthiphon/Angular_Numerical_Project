import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JacobiIterationComponent } from './jacobi-iteration.component';

describe('JacobiIterationComponent', () => {
  let component: JacobiIterationComponent;
  let fixture: ComponentFixture<JacobiIterationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JacobiIterationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JacobiIterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
