import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstructuraCentroComponent } from './estructura-centro.component';

describe('EstructuraCentroComponent', () => {
  let component: EstructuraCentroComponent;
  let fixture: ComponentFixture<EstructuraCentroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstructuraCentroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstructuraCentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
