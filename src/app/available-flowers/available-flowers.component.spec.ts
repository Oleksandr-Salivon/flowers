import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableFlowersComponent } from './available-flowers.component';

describe('AvailableFlowersComponent', () => {
  let component: AvailableFlowersComponent;
  let fixture: ComponentFixture<AvailableFlowersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableFlowersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableFlowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
