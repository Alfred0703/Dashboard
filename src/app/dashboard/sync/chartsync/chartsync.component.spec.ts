import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsyncComponent } from './chartsync.component';

describe('ChartsyncComponent', () => {
  let component: ChartsyncComponent;
  let fixture: ComponentFixture<ChartsyncComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartsyncComponent]
    });
    fixture = TestBed.createComponent(ChartsyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
