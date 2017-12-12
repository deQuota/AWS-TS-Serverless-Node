import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusGraphicComponent } from './status-graphic.component';

describe('StatusGraphicComponent', () => {
  let component: StatusGraphicComponent;
  let fixture: ComponentFixture<StatusGraphicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusGraphicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
