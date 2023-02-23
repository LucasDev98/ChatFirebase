import { Component } from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
    mensaje : string = ''

    constructor( public _cs : ChatService ){


    }


    enviarMensaje( mensaje : string ){

    }
}
