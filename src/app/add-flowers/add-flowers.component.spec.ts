import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFlowersComponent } from './add-flowers.component';

describe('AddFlowersComponent', () => {
  let component: AddFlowersComponent;
  let fixture: ComponentFixture<AddFlowersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFlowersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFlowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
