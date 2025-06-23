import { Component, OnInit } from '@angular/core';
import { GastosService } from '../../services/gastos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-lista-gastos',
  templateUrl: './lista-gastos.page.html',
  styleUrls: ['./lista-gastos.page.scss'],
  standalone: false
})
export class ListaGastosPage implements OnInit {
  datos: any[] = [];
  dataGastos: any;
  dataAbonos: any;
  cargando = true;
  mensaje = '';

  constructor(
    private gastosService: GastosService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  consultarIA() {
    this.generarYSeleccionarPrompt();
  }


  ngOnInit() {
    this.gastosService.obtenerGastosAgrupados().subscribe({
      next: (res) => {
        this.datos = res;

        const gastosFiltrados = res.filter((g: any) => g.totalGastos > 0);
        const abonosFiltrados = res.filter((g: any) => g.totalAbonos > 0);

        this.dataGastos = {
          labels: gastosFiltrados.map(g => g.descripcion),
          datasets: [{
            data: gastosFiltrados.map(g => g.totalGastos),
            backgroundColor: this.generarColores(gastosFiltrados.length)
          }]
        };

        this.dataAbonos = {
          labels: abonosFiltrados.map(g => g.descripcion),
          datasets: [{
            data: abonosFiltrados.map(g => g.totalAbonos),
            backgroundColor: this.generarColores(abonosFiltrados.length)
          }]
        };

        this.cargando = false;
      },
      error: (err) => {
        this.mensaje = 'No se pudieron cargar los datos.';
        this.cargando = false;
      }
    });
  }

  irASubirCartola() {
    this.router.navigate(['/gastos'], { queryParams: { nueva: true } });
  }

  generarColores(cantidad: number): string[] {
    const colores = [];
    for (let i = 0; i < cantidad; i++) {
      const hue = Math.floor((360 / cantidad) * i);
      colores.push(`hsl(${hue}, 70%, 60%)`);
    }
    return colores;
  }

  async generarYSeleccionarPrompt() {
    if (!this.datos.length) return;

    const topGasto = [...this.datos]
      .filter(d => d.totalGastos > 0)
      .sort((a, b) => b.totalGastos - a.totalGastos)[0];

    const totalGastos = this.datos.reduce((sum, g) => sum + (g.totalGastos || 0), 0);
    const totalAbonos = this.datos.reduce((sum, g) => sum + (g.totalAbonos || 0), 0);
    const saldo = totalAbonos - totalGastos;

    const prompts = [
      `¿Cómo puedo reducir mis gastos en "${topGasto?.descripcion}"?`,
      `¿Es saludable un saldo actual de $${saldo.toFixed(0)} considerando mis ingresos y gastos?`,
      `¿Qué sugerencias tienes para optimizar mis abonos, que totalizan $${totalAbonos.toFixed(0)}?`,
      `¿En qué categorías debería ahorrar más si estoy gastando $${totalGastos.toFixed(0)} al mes?`,
      `¿Qué recomendaciones me das si mi gasto más alto es en "${topGasto?.descripcion}"?`
    ];

    const alert = await this.alertCtrl.create({
      header: 'Selecciona una consulta',
      inputs: prompts.map((prompt, index) => ({
        name: `prompt${index}`,
        type: 'radio',
        label: prompt,
        value: prompt
      })),
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Enviar',
          handler: (selectedPrompt: string) => {
            if (selectedPrompt) {
              this.router.navigate(['/consulta-gpt'], {
                queryParams: { prompt: selectedPrompt }
              });
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
