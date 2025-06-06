// src/app/pages/consulta-gpt/consulta-gpt.page.ts

import { Component } from '@angular/core';
import { AiService } from '../../services/ai.service'; // Importamos nuestro nuevo servicio

@Component({
  selector: 'app-consulta-gpt',
  templateUrl: './consulta-gpt.page.html',
  styleUrls: ['./consulta-gpt.page.scss'],
  standalone:false
})
export class ConsultaGptPage {
  
  // Este array almacenará todos los mensajes del chat
  chatMessages: { sender: 'user' | 'bot', text: string }[] = [];
  userInput: string = ''; // Variable para el texto que el usuario escribe
  isLoading: boolean = false; // Para mostrar un indicador de carga

  constructor(private aiService: AiService) { // Inyectamos el servicio de IA
    // Añadimos un mensaje de bienvenida del bot al iniciar la página
    this.chatMessages.push({ sender: 'bot', text: 'Hola, soy tu asesor financiero. ¿En qué puedo ayudarte hoy?' });
  }

  sendMessage() {
    // Si el input está vacío, no hacemos nada
    if (!this.userInput.trim()) return;

    // 1. Añadimos el mensaje del usuario a la lista para que se vea en pantalla
    this.chatMessages.push({ sender: 'user', text: this.userInput });
    const userPrompt = this.userInput;
    this.userInput = ''; // Limpiamos el campo de texto
    this.isLoading = true; // Activamos el indicador de carga

    // 2. Llamamos al servicio para obtener la respuesta de la IA
    this.aiService.getAdvice(userPrompt).subscribe({
      next: (response) => {
        // 3. Cuando llega la respuesta, la añadimos a la lista de mensajes
        this.chatMessages.push({ sender: 'bot', text: response.advice });
        this.isLoading = false; // Desactivamos el indicador de carga
      },
      error: (err) => {
        console.error(err);
        // Si hay un error, mostramos un mensaje de error en el chat
        this.chatMessages.push({ sender: 'bot', text: 'Lo siento, ocurrió un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.' });
        this.isLoading = false;
      }
    });
  }
}