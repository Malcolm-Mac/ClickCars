import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedLeadsComponent } from './received-leads.component';

describe('ReceivedLeadsComponent', () => {
  let component: ReceivedLeadsComponent;
  let fixture: ComponentFixture<ReceivedLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivedLeadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivedLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
