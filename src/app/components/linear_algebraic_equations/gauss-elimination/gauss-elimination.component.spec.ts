import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaussEliminationComponent } from './gauss-elimination.component';

describe('GaussEliminationComponent', () => {
  let component: GaussEliminationComponent;
  let fixture: ComponentFixture<GaussEliminationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaussEliminationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GaussEliminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
