import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.page.html',
  styleUrls: ['./opciones.page.scss'],
  standalone:false
})
export class OpcionesPage implements OnInit {

  constructor(private router: Router) { }

  irAMenuPrincipal(){
    this.router.navigate(['/menu-principal']);
  }

  ngOnInit() {
  }

}
