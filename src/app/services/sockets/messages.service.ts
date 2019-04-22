import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  observable:Observable<any>;
  socket;
  constructor() {
    //this.socket=io('http://localhost:3000');

  }
  getData():Observable<string> {
    return this.observable = new Observable((observer) => {
      this.socket.on('message', (data) => {
        console.log("conectado con el servidor");
        observer.next(data);
        console.log(data);
        console.log(observer);
      });
    });
  }
}
