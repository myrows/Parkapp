import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadComponent } from './unidad.component';

describe('UnidadComponent', () => {
  let component: UnidadComponent;
  let fixture: ComponentFixture<UnidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
