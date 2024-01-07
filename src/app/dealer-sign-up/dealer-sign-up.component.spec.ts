import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerSignUpComponent } from './dealer-sign-up.component';

describe('DealerSignUpComponent', () => {
  let component: DealerSignUpComponent;
  let fixture: ComponentFixture<DealerSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerSignUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
