import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDeviceDetailsComponent } from './update-device-details.component';

describe('UpdateDeviceDetailsComponent', () => {
  let component: UpdateDeviceDetailsComponent;
  let fixture: ComponentFixture<UpdateDeviceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDeviceDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDeviceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
