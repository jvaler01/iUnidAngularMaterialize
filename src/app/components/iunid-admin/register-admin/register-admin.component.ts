import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../models/User';
import {Router} from '@angular/router';
import {ControllerService} from '../../../services/controller.service';
declare var $: any;
declare var M: any;

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit {
  form: FormGroup;
  user: User = {
    email: '',
    password: '',
    token: ''
  };
  valid = false;
  constructor(private router: Router,
              private controller: ControllerService) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      password: new FormControl('', Validators.required),
      repeatPassword: new FormControl(),
    });
    console.log(this.form);
    this.form.controls['repeatPassword'].setValidators([
      Validators.required,
      this.noIgual.bind( this.form )
    ]);
  }

  ngOnInit() {

  }
  noIgual( control: FormControl): any {
    let forma: any = this;
    if ( control.value !== forma.controls['password'].value) {
      return {
        noiguales: true
      };
    }
    return null;
  }


  sendData() {

    let userData:any = {};

    userData.password = this.form.get('password').value;
    console.log(userData);
    let userSesion = JSON.parse(localStorage.getItem('user'));
    userData.userType = userSesion.userDB.userType;
    userData.userEmail = this.form.get('email').value;
    userData.email = userSesion.userDB.email;
    userData.newUserType = 'ADMIN_ROLE';
    this.controller.newUserOrCompany( userSesion.token, userData).subscribe( data => {
      this.router.navigate( ['**']);
    }, error => {
      console.log(error);
      this.router.navigate( ['/errors']);
    });
    console.log(this.form.value);
  }
}
