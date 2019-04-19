import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SesionStatusService {

  private logged = new BehaviorSubject(false);
  currenSesionStatus = this.logged.asObservable();

  private type = new BehaviorSubject('user');
  currentType = this.type.asObservable();
  constructor() { }

  checkLogged() {
    if(localStorage.getItem('user')) {
      this.logged.next(true);
      let user = JSON.parse(localStorage.getItem('user'));
      if(user.userDB){
        this.type.next('user');
      }else {
        this.type.next('company');
      }
    } else {
      this.logged.next(false);
    }
  }
}
