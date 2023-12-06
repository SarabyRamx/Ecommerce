import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizaCompraComponent } from './finaliza-compra.component';

describe('FinalizaCompraComponent', () => {
  let component: FinalizaCompraComponent;
  let fixture: ComponentFixture<FinalizaCompraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinalizaCompraComponent]
    });
    fixture = TestBed.createComponent(FinalizaCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
