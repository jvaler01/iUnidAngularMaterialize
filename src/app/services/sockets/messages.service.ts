import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  observable:Observable<any>;
  socket;
  private data1 = new BehaviorSubject({});
  data = this.data1.asObservable();
  constructor() {
    this.socket=io('http://localhost:3000',{transports: ['websocket']});

  }
  chatInit(email: string, id: string){
    console.log(id);
    this.socket.emit('user', {email: email, id: "5ce59eda6c5d0a1dace5e048"})
  }

  chatLoad(){
    /*let observable = new Observable<{}>(observer=>{
      this.socket.on('messages', (data)=>{
        console.log(data);
        observer.next(data);
      });
    });
    return observable;*/
    this.socket.on('messages', (data)=>{
      console.log(data);
      this.data1.next(data);
    });
    return this.data;
  }
}
