import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
    mensaje : string = ''
    chatDom! : any;
    spinner : boolean = true;
    constructor( public _cs : ChatService ){
        this._cs.mostrarMensajes()
            .subscribe( ()=> {
                setTimeout( ()=> {
                  this.chatDom.scrollTop = this.chatDom.scrollHeight;
                },30)
                this.spinner = false;
            })
    }
    ngOnInit(): void {
      this.chatDom = document.getElementById('app-mensajes');
    }

    enviarMensaje(){

      if( this.mensaje.length === 0) {
        return
      }



        this._cs.agregarMensaje( this.mensaje )
        this.mensaje = '';

    }
}
