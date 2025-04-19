import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-gastos',
  templateUrl: './lista-gastos.page.html',
  styleUrls: ['./lista-gastos.page.scss'],
  standalone: false
})
export class ListaGastosPage implements OnInit {
  gastos: string[] = [
    'Gasto 1',
    'Gasto 2',
    'Gasto 3',
    'Gasto 4',
    'Gasto 5',
    'Gasto 6',
    'Gasto 7',
    'Gasto 8',
    'Gasto 9',
    'Gasto 10',
    'Gasto 11'
  ];

  constructor() { }

  ngOnInit() {
  }

}
