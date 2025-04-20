import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-familia',
  templateUrl: './familia.page.html',
  styleUrls: ['./familia.page.scss'],
  standalone:false
})
export class FamiliaPage implements OnInit {

  miembros = [
    { nombre: 'Juan', edad: 30 },
    { nombre: 'María', edad: 25 },
    { nombre: 'Pedro', edad: 35 }
  ];

  constructor(private router: Router) { }

  irAOpciones() {
    this.router.navigate(['/opciones']);
  }  

  agregarMiembro(){

  }
  editarMiembro(){
    
  }

  borrarMiembro(){
  }

  irAMiembro(){
  }

  ngOnInit() {
  }

}
