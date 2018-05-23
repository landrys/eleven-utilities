import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LcproxyComponent } from './lcproxy.component';

describe('LcproxyComponent', () => {
  let component: LcproxyComponent;
  let fixture: ComponentFixture<LcproxyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LcproxyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LcproxyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
