import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHistorialComponent } from './update-historial.component';

describe('UpdateHistorialComponent', () => {
  let component: UpdateHistorialComponent;
  let fixture: ComponentFixture<UpdateHistorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateHistorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
