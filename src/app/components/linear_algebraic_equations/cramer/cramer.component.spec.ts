import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CramerComponent } from './cramer.component';

describe('CramerComponent', () => {
  let component: CramerComponent;
  let fixture: ComponentFixture<CramerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CramerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CramerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
