import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta-gpt',
  templateUrl: './consulta-gpt.page.html',
  styleUrls: ['./consulta-gpt.page.scss'],
  standalone: false
})
export class ConsultaGptPage implements OnInit {

  // Lista ficticia para mostrar el menú en el HTML
  menuItems = Array(2).fill({ label: 'Menu Label', description: 'Menu description.' });

  // Variable de consulta (aunque no se use realmente)
  consulta: string = '';

  constructor(private router: Router) { }

  irAOpciones() {
    this.router.navigate(['/opciones']);
  }  

  irAMenuPrincipal(){
    this.router.navigate(['/menu-principal']);
  }

  ngOnInit() {
    // Aquí no necesitas hacer nada por ahora
  }

  // Método vacío solo para que el botón funcione sin error
  enviarConsulta() {
    console.log('Consulta:', this.consulta);
  }

}