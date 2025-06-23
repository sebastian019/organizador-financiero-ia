import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AiService } from '../../services/ai.service';

@Component({
  selector: 'app-consulta-gpt',
  templateUrl: './consulta-gpt.page.html',
  styleUrls: ['./consulta-gpt.page.scss'],
  standalone: false
})
export class ConsultaGptPage implements OnInit {
  prompts: string[] = [
    '¿Cómo puedo reducir mis gastos mensuales?',
    '¿Qué estrategias de inversión son seguras para principiantes?',
    '¿Debería ahorrar en dólares o en mi moneda local?',
    '¿Cuánto debo guardar para emergencias?'
  ];

  selectedPrompt: string = '';
  isLoading: boolean = false;
  chatMessages: { sender: 'user' | 'bot', text: string }[] = [];

  constructor(
    private aiService: AiService,
    private route: ActivatedRoute
  ) {
    this.chatMessages.push({
      sender: 'bot',
      text: 'Hola, soy tu asesor financiero. ¿En qué puedo ayudarte hoy?'
    });
  }

  ngOnInit() {
    // Capturar prompt desde queryParams
    this.route.queryParams.subscribe(params => {
      const prompt = params['prompt'];
      if (prompt) {
        this.selectedPrompt = prompt;

        // Opcional: agregar a la lista si no existe
        if (!this.prompts.includes(prompt)) {
          this.prompts.unshift(prompt);
        }
      }
    });
  }

  sendMessage() {
    if (!this.selectedPrompt.trim()) return;

    this.chatMessages.push({ sender: 'user', text: this.selectedPrompt });
    const userPrompt = this.selectedPrompt;
    this.selectedPrompt = '';
    this.isLoading = true;

    this.aiService.getAdvice(userPrompt).subscribe({
      next: (response) => {
        this.chatMessages.push({ sender: 'bot', text: response.advice });
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.chatMessages.push({
          sender: 'bot',
          text: 'Lo siento, ocurrió un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.'
        });
        this.isLoading = false;
      }
    });
  }
}