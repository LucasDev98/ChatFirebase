import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection  } from '@angular/fire/compat/firestore';
import { Mensaje } from '../interface/mensaje';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection!: AngularFirestoreCollection<Mensaje>;
  public chats! : Mensaje[] ;

  constructor( private afs : AngularFirestore ) {

    this.mostrarMensajes().subscribe()
  }


  mostrarMensajes(){
    this.itemsCollection = this.afs.collection<Mensaje>('chats')
    return this.itemsCollection.valueChanges()
          .pipe( map( data => {
              console.log( data )
              this.chats = data;
          }))
  }
}
