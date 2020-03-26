import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateZonaComponent } from './update-zona.component';

describe('UpdateZonaComponent', () => {
  let component: UpdateZonaComponent;
  let fixture: ComponentFixture<UpdateZonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateZonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateZonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
