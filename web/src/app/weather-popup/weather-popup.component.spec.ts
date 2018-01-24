import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherPopupComponent } from './weather-popup.component';

describe('WeatherPopupComponent', () => {
  let component: WeatherPopupComponent;
  let fixture: ComponentFixture<WeatherPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
