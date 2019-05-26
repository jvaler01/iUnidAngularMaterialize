import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import * as io from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  socket;
  uploader;
  private loadMessagesObservable = new BehaviorSubject({});
  private newMessageObservable = new BehaviorSubject({});
  private show = new BehaviorSubject(false);
  loadMessages = this.loadMessagesObservable.asObservable();
  newMessageData = this.newMessageObservable.asObservable();
  showData = this.show.asObservable();
  constructor() {
    this.socket=io('http://localhost:3000',{transports: ['websocket']});

  }
  chatInit(email: string, id: string){
    console.log(id);
    this.socket=io('http://localhost:3000',{transports: ['websocket']});

    this.socket.emit('user', {email: email, id: id})
  }

  chatLoad(){
    this.socket.on('messages', (data)=>{
      console.log(data);
      this.loadMessagesObservable.next(data);
    });
    return this.loadMessages;
  }

  closeSocket(){
    this.socket.disconnect();
  }

  /*newMessage(){
    this.socket.on('chat message', (data)=>{
      this.newMessageObservable.next(data);
      //this.show.next(true);
    });
    return this.newMessageData;
  }*/

  getMessages = () => {
    return Observable.create((observer) => {
      this.socket.on('chat message', (message) => {
        observer.next(message);
      });
    });
  };

  getFiles = () => {
    return Observable.create((observer) => {
      this.socket.on('chatDelivery', (message) => {
        observer.next(message);
      });
    });
  };

  sendMessage(message: any){
    console.log(message);
    this.socket.emit('chat message', message);
  }
}
