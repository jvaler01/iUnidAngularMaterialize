import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  ret = true;
  isLogged() {
    if (localStorage.getItem('user')) {
      return true;
    } else {
      console.log('Please log in');
      return false;
    }
    /*if(this.ret){
      return true;
    }else{
      console.log('Please log in');
      return false;
    }*/
  }
}
