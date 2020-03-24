import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadAparcamientoComponent } from './upload-aparcamiento.component';

describe('UploadAparcamientoComponent', () => {
  let component: UploadAparcamientoComponent;
  let fixture: ComponentFixture<UploadAparcamientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadAparcamientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadAparcamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
