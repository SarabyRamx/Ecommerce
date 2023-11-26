import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenproductosComponent } from './resumenproductos.component';

describe('ResumenproductosComponent', () => {
  let component: ResumenproductosComponent;
  let fixture: ComponentFixture<ResumenproductosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResumenproductosComponent]
    });
    fixture = TestBed.createComponent(ResumenproductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
