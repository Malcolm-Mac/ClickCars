import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoVehicleFoundComponent } from './no-vehicle-found.component';

describe('NoVehicleFoundComponent', () => {
  let component: NoVehicleFoundComponent;
  let fixture: ComponentFixture<NoVehicleFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoVehicleFoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoVehicleFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
