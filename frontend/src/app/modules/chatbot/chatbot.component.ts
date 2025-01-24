import { Component, ViewChild } from '@angular/core';
import { PoPageSlideComponent } from '@po-ui/ng-components';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  
  @ViewChild('pageSlideChatBot') pageSlideChatBot!: PoPageSlideComponent;
  
  contentVisible: boolean = false;

  onChatbotClick() {
    this.pageSlideChatBot.open();

    setTimeout(() => {
      this.contentVisible = true;
    }, 2500);
  }
}
