import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProPrintLatoutComponent } from './pro-print-latout.component';

describe('ProPrintLatoutComponent', () => {
  let component: ProPrintLatoutComponent;
  let fixture: ComponentFixture<ProPrintLatoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProPrintLatoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProPrintLatoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
