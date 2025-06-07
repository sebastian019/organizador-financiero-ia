import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvertirPage } from './invertir.page';

describe('InvertirPage', () => {
  let component: InvertirPage;
  let fixture: ComponentFixture<InvertirPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InvertirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
