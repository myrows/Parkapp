import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyoEscolarComponent } from './anyo-escolar.component';

describe('AnyoEscolarComponent', () => {
  let component: AnyoEscolarComponent;
  let fixture: ComponentFixture<AnyoEscolarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyoEscolarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyoEscolarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
