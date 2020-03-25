import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateZonaComponent } from './create-zona.component';

describe('CreateZonaComponent', () => {
  let component: CreateZonaComponent;
  let fixture: ComponentFixture<CreateZonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateZonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateZonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
