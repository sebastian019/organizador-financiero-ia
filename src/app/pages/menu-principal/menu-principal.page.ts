import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.page.html',
  styleUrls: ['./menu-principal.page.scss'],
  standalone:false
})
export class MenuPrincipalPage implements OnInit {

  public username: string | null = null; 

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.username = this.authService.getUsername();
  }

  irAGastos() {
    this.router.navigate(['/gastos']);
  }

  irAInversiones() {
    this.router.navigate(['/inversiones']);
  }

  irConsultaGpt(){
    this.router.navigate(['/consulta-gpt']);
  }

  irAOpciones() {
    this.router.navigate(['/opciones']);
  }  

  irAFamilia() {
    this.router.navigate(['/familia']);
  }

}
