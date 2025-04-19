import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultaGptPage } from './consulta-gpt.page';

describe('ConsultaGptPage', () => {
  let component: ConsultaGptPage;
  let fixture: ComponentFixture<ConsultaGptPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaGptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
