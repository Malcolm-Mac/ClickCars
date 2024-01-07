import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourVehiclesComponent } from './your-vehicles.component';

describe('YourVehiclesComponent', () => {
  let component: YourVehiclesComponent;
  let fixture: ComponentFixture<YourVehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourVehiclesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
