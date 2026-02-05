import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPercentage } from './admin-percentage';

describe('AdminPercentage', () => {
  let component: AdminPercentage;
  let fixture: ComponentFixture<AdminPercentage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPercentage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPercentage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
