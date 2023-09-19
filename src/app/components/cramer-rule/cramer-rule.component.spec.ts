import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CramerRuleComponent } from './cramer-rule.component';

describe('CramerRuleComponent', () => {
  let component: CramerRuleComponent;
  let fixture: ComponentFixture<CramerRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CramerRuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CramerRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
