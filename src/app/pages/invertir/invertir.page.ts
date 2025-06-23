import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GastosService } from 'src/app/services/gastos.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-invertir',
  templateUrl: './invertir.page.html',
  styleUrls: ['./invertir.page.scss'],
  standalone: false
})
export class InvertirPage implements OnInit {
  accion = { nombre: '', symbol: '', precio: 0, cambio: 0 };
  cantidad: number = 1;

  constructor(
    private router: Router,
    private gastosService: GastosService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['accionSeleccionada']) {
      this.accion = navigation.extras.state['accionSeleccionada'];
    }
  }

  aumentar() {
    this.cantidad++;
  }

  disminuir() {
    if (this.cantidad > 1) this.cantidad--;
  }

  onCantidadChange(event: any) {
    const val = parseInt(event.detail.value, 10);
    this.cantidad = (!isNaN(val) && val > 0) ? val : 1;
  }

  volver() {
    this.router.navigate(['/inversiones']);
  }

  async comprar() {
    const monto = this.accion.precio * this.cantidad;

    try {
      const saldoRes = await this.gastosService.obtenerSaldoActual().toPromise();

      if (!saldoRes || saldoRes.saldo === undefined || saldoRes.saldo === null) {
        throw new Error('No se pudo obtener el saldo actual');
      }

      const saldoActual = saldoRes.saldo;

      if (saldoActual < monto) {
        const alert = await this.alertCtrl.create({
          header: 'Saldo insuficiente',
          message: `Tu saldo actual es $${saldoActual.toFixed(2)}, y necesitas $${monto.toFixed(2)}.`,
          buttons: ['OK']
        });
        await alert.present();
        return;
      }

      const nuevoSaldo = saldoActual - monto;

      await this.gastosService.registrarCompraAccion({
        descripcion: `Compra de ${this.cantidad} acción(es) de ${this.accion.nombre}`,
        fecha: new Date().toISOString(),
        monto,
        id_usuario: JSON.parse(atob(localStorage.getItem('token')!.split('.')[1])).id_usuario,
        saldo_actualizado: nuevoSaldo
      }).toPromise();

      const success = await this.alertCtrl.create({
        header: 'Compra realizada',
        message: 'La compra se ha registrado exitosamente.',
        buttons: ['OK']
      });
      await success.present();
      this.router.navigate(['/inversiones']);

    } catch (error) {
      console.error(error);
      const errorAlert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Ocurrió un error al realizar la compra.',
        buttons: ['OK']
      });
      await errorAlert.present();
    }
  }
}
