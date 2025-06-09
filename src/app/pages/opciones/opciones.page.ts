import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.page.html',
  styleUrls: ['./opciones.page.scss'],
  standalone:false
})
export class OpcionesPage implements OnInit {
  
  backgroundColors = [
    { name: 'Blanco (Por defecto)', value: '#ffffff' },
    { name: 'Gris Claro', value: '#f0f2f5' },
    { name: 'Beige', value: '#faf0e6' },
    { name: 'Negro', value: '#121212' },
  ];

  headerColors = [
    { name: 'Azul (Por defecto)', value: '#0d6efd' },
    { name: 'Verde', value: '#198754' },
    { name: 'Rojo', value: '#dc3545' },
    { name: 'Negro', value: '#212529' },
  ];

  selectedBackground: string = '#ffffff';
  selectedHeader: string = '#0d6efd';

  constructor(private router: Router) {}

  ngOnInit() {
    this.selectedBackground = localStorage.getItem('theme-background') || '#ffffff';
    this.selectedHeader = localStorage.getItem('theme-header') || '#0d6efd';
  }

  changeBackgroundColor(color: string) {
    this.selectedBackground = color;
    document.documentElement.style.setProperty('--ion-background-color', color);
    localStorage.setItem('theme-background', color);

    if (color === '#121212') { 
      document.body.classList.add('dark');
      localStorage.setItem('theme-mode', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme-mode', 'light');
    }
  }

  changeHeaderColor(color: string) {
    this.selectedHeader = color;
    document.documentElement.style.setProperty('--ion-color-primary', color);
    localStorage.setItem('theme-header', color);
  }
}