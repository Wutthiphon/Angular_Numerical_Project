import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicalMethodComponent } from './graphical-method.component';

describe('GraphicalMethodComponent', () => {
  let component: GraphicalMethodComponent;
  let fixture: ComponentFixture<GraphicalMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphicalMethodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphicalMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
