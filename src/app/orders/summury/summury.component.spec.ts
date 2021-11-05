import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummuryComponent } from './summury.component';

describe('SummuryComponent', () => {
  let component: SummuryComponent;
  let fixture: ComponentFixture<SummuryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummuryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummuryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
