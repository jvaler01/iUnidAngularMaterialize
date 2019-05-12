import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorServiceService {

  private message = new BehaviorSubject('');
  currentMessage = this.message.asObservable();

  constructor() { }

  takeMessage(message: string) {
    this.message.next(message);
  }
}
