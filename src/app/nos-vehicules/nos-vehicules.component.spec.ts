import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NosVehiculesComponent } from './nos-vehicules.component';

describe('NosVehiculesComponent', () => {
  let component: NosVehiculesComponent;
  let fixture: ComponentFixture<NosVehiculesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NosVehiculesComponent]
    });
    fixture = TestBed.createComponent(NosVehiculesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
