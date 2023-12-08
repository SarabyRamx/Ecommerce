import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciboCompraComponent } from './recibo-compra.component';

describe('ReciboCompraComponent', () => {
  let component: ReciboCompraComponent;
  let fixture: ComponentFixture<ReciboCompraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReciboCompraComponent]
    });
    fixture = TestBed.createComponent(ReciboCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
