import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.page.html',
  styleUrls: ['./menu-principal.page.scss'],
  standalone:false
})
export class MenuPrincipalPage implements OnInit {

  constructor(private router: Router) {}

  irAInversiones() {
    this.router.navigate(['/inversiones']);
  }

  irConsultaGpt(){
    this.router.navigate(['/consulta-gpt']);
  }

  ngOnInit() {
  }

}
