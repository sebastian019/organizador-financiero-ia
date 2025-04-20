import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
  standalone: false
})
export class GastosPage implements OnInit {

  constructor(private router: Router) { }

  irAOpciones() {
    this.router.navigate(['/opciones']);
  }  

  irAListaGastos() {
    this.router.navigate(['/lista-gastos']);
  }

  irAMenuPrincipal(){
    this.router.navigate(['/menu-principal']);
  }

  ngOnInit() {
  }

}
