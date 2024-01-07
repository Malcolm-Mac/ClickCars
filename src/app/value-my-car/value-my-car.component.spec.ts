import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueMyCarComponent } from './value-my-car.component';

describe('ValueMyCarComponent', () => {
  let component: ValueMyCarComponent;
  let fixture: ComponentFixture<ValueMyCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValueMyCarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueMyCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
