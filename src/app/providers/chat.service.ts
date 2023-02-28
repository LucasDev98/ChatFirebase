import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection  } from '@angular/fire/compat/firestore';
import { Mensaje } from '../interface/mensaje';
import { map } from 'rxjs/operators';


import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection!: AngularFirestoreCollection<Mensaje>;
  public chats! : Mensaje[] ;
  public user : any = {}

  constructor( private afs : AngularFirestore,
               private auth : AngularFireAuth ) {

                this.auth.authState.subscribe( user => {
                    console.log( user );

                    if( !user ){
                      return
                    }else {
                      this.user.displayName = user.displayName;
                      this.user.uid = user.uid;
                    }
                })

  }


  login( ) {
      this.auth.signInWithPopup( new firebase.auth.GoogleAuthProvider() )
  }

  logout(){
    this.user = {}
    this.auth.signOut();
  }
  //Recibe los mensajes de Firebase
  mostrarMensajes(){
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha','desc').limit(5))
    this.chats = [];
    return this.itemsCollection.valueChanges( )
          .pipe( map( ( mensajes : Mensaje []) => {
              this.chats = [];
              for(let mensaje of mensajes ){
                this.chats.unshift( mensaje )
              }


          }))
  }

  agregarMensaje( texto : string ){

    let mensaje = {
      nombre :  this.user.displayName,
      mensaje : texto,
      uid : this.user.uid,
      fecha : new Date().getTime(),
    }
    this.itemsCollection.add(mensaje)
  }
}
