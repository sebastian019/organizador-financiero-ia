import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service'; 
import { GastosService } from '../../services/gastos.service';


@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.page.html',
  styleUrls: ['./menu-principal.page.scss'],
  standalone: false
})
export class MenuPrincipalPage implements OnInit {
  public username: string | null = null; 
  public saldoActual: number = 0;

  constructor(
    private router: Router,
    private authService: AuthService,
    private gastosService: GastosService
  ) {}

  ngOnInit() {
    this.username = this.authService.getUsername();
    this.obtenerSaldo();

    // 🔄 Detectar retorno a esta página
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.urlAfterRedirects === '/menu-principal') {
        this.obtenerSaldo();
      }
    });
  }


  obtenerSaldo() {
    this.gastosService.obtenerSaldoActual().subscribe({
      next: (data) => {
        this.saldoActual = typeof data?.saldo === 'number' ? data.saldo : 0;
      },
      error: (err) => {
        console.warn('No se pudo obtener el saldo:', err);
        this.saldoActual = 0;
      }
    });
  }

  irAGastos() {
    this.router.navigate(['/gastos']);
  }

  irAInversiones() {
    this.router.navigate(['/inversiones']);
  }

  irConsultaGpt() {
    this.router.navigate(['/consulta-gpt']);
  }

  irAOpciones() {
    this.router.navigate(['/opciones']);
  }

  irAFamilia() {
    this.router.navigate(['/familia']);
  }
}
