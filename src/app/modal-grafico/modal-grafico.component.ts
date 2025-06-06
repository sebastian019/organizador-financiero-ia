import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChartType } from 'chart.js';



@Component({
  selector: 'app-modal-grafico',
  templateUrl: './modal-grafico.component.html',
  standalone: false
})
export class ModalGraficoComponent {
  @Input() accion: any;

  datosCargados = false;
  lineChartData: any;
  lineChartType: ChartType = 'line';
  lineChartOptions = { responsive: true };

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    // Simular carga de datos de los últimos 3 meses
    setTimeout(() => {
      this.lineChartData = {
        labels: ['Abr', 'May', 'Jun'],
        datasets: [
          {
            data: [this.random(), this.random(), this.random()],
            label: 'Precio',
            borderColor: '#3e95cd',
            fill: false
          }
        ]
      };
      this.datosCargados = true;
    }, 1000);
  }

  random() {
    return (Math.random() * 1000).toFixed(2);
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }
}
