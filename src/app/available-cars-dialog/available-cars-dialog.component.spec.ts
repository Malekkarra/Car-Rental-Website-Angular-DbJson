import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableCarsDialogComponent } from './available-cars-dialog.component';

describe('AvailableCarsDialogComponent', () => {
  let component: AvailableCarsDialogComponent;
  let fixture: ComponentFixture<AvailableCarsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvailableCarsDialogComponent]
    });
    fixture = TestBed.createComponent(AvailableCarsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
