import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturePercentage } from './feature-percentage';

describe('FeaturePercentage', () => {
  let component: FeaturePercentage;
  let fixture: ComponentFixture<FeaturePercentage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturePercentage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturePercentage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
