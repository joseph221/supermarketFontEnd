import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesPrintLayoutComponent } from './sales-print-layout.component';

describe('SalesPrintLayoutComponent', () => {
  let component: SalesPrintLayoutComponent;
  let fixture: ComponentFixture<SalesPrintLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesPrintLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesPrintLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
