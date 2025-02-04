import { Component, ViewChild, ElementRef } from '@angular/core';
import { PoPageSlideComponent } from '@po-ui/ng-components';
import { InformationUserService } from 'src/app/services/informationUser.service';
import { GeminiApiService } from 'src/app/services/geminiApi.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {

  @ViewChild('pageSlideChatBot') pageSlideChatBot!: PoPageSlideComponent;
  @ViewChild('chatContainer') chatContainer!: ElementRef;

  contentVisible: boolean = false;
  userName: string = '';
  userInput: string = '';
  chatMessages: { text: string, sender: 'user' | 'bot' }[] = [];
  botTyping: boolean = false;
  firstMessageSent: boolean = false;

  constructor(
    private userService: InformationUserService,
    private geminiService: GeminiApiService
  ) { }

  ngOnInit() {
    const userInfo = this.userService.getUserInfo();
    if (userInfo && userInfo.name) {
      this.userName = this.capitalizeName(userInfo.name);
    }

    const storedMessages = localStorage.getItem('chatMessages');
    if (storedMessages) {
      this.chatMessages = JSON.parse(storedMessages);
    }
  }

  capitalizeName(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  onChatbotClick() {
    this.pageSlideChatBot.open();
    setTimeout(() => {
      this.contentVisible = true;
    }, 2500);
  }

  enviarMensagem() {
    if (!this.userInput.trim()) return;

    this.firstMessageSent = true;

    const mensagem = this.userInput;
    this.chatMessages.push({ text: mensagem, sender: 'user' });
    this.userInput = '';
    this.botTyping = true;

    this.geminiService.enviarPergunta(this.formatarHistorico()).subscribe((resposta: any) => {
      setTimeout(() => {
        this.botTyping = false;
        this.simularDigitacao(resposta);
      }, 1500);
    });

    this.scrollToBottom();
  }

  formatarHistorico(): string {
    return this.chatMessages.map(msg => `${msg.sender === 'user' ? 'Você: ' : 'Chatbot: '} ${msg.text}`).join('\n');
  }

  simularDigitacao(texto: string) {
    this.botTyping = true;

    let index = 0;
    let respostaDigitada = '';

    const intervalo = setInterval(() => {
      if (index < texto.length) {
        respostaDigitada += texto[index];
        if (this.chatMessages.length > 0 && this.chatMessages[this.chatMessages.length - 1].sender === 'bot') {
          this.chatMessages[this.chatMessages.length - 1].text = respostaDigitada;
        } else {
          this.chatMessages.push({ text: respostaDigitada, sender: 'bot' });
        }
        index++;
      } else {
        clearInterval(intervalo);
        this.botTyping = false;
        this.salvarHistorico();
        this.scrollToBottom();
      }
    }, 25);
  }

  salvarHistorico() {
    localStorage.setItem('chatMessages', JSON.stringify(this.chatMessages));
  }

  limparHistorico() {
    this.chatMessages = [];
    localStorage.removeItem('chatMessages');
  }

  scrollToBottom(): void {
    setTimeout(() => {
      const container = this.chatContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    }, 100);
  }
}
