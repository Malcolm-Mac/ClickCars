import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiseYourCarComponent } from './advertise-your-car.component';

describe('AdvertiseYourCarComponent', () => {
  let component: AdvertiseYourCarComponent;
  let fixture: ComponentFixture<AdvertiseYourCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertiseYourCarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiseYourCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
