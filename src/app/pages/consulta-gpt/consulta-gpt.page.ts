import { Component } from '@angular/core';
import { AiService } from '../../services/ai.service'; 
@Component({
  selector: 'app-consulta-gpt',
  templateUrl: './consulta-gpt.page.html',
  styleUrls: ['./consulta-gpt.page.scss'],
  standalone:false
})
export class ConsultaGptPage {
  
  chatMessages: { sender: 'user' | 'bot', text: string }[] = [];
  userInput: string = ''; 
  isLoading: boolean = false; 

  constructor(private aiService: AiService) { 
    this.chatMessages.push({ sender: 'bot', text: 'Hola, soy tu asesor financiero. ¿En qué puedo ayudarte hoy?' });
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    this.chatMessages.push({ sender: 'user', text: this.userInput });
    const userPrompt = this.userInput;
    this.userInput = ''; 
    this.isLoading = true; 

    this.aiService.getAdvice(userPrompt).subscribe({
      next: (response) => {
        this.chatMessages.push({ sender: 'bot', text: response.advice });
        this.isLoading = false; 
      },
      error: (err) => {
        console.error(err);
        this.chatMessages.push({ sender: 'bot', text: 'Lo siento, ocurrió un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.' });
        this.isLoading = false;
      }
    });
  }
}