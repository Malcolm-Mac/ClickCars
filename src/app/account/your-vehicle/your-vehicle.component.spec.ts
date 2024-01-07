import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourVehicleComponent } from './your-vehicle.component';

describe('YourVehicleComponent', () => {
  let component: YourVehicleComponent;
  let fixture: ComponentFixture<YourVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourVehicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
