import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreprintlayoutComponent } from './storeprintlayout.component';

describe('StoreprintlayoutComponent', () => {
  let component: StoreprintlayoutComponent;
  let fixture: ComponentFixture<StoreprintlayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreprintlayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreprintlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
