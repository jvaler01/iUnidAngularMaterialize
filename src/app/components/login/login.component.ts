import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/User';
import { ControllerService } from '../../services/controller.service';
import { SesionStatusService } from '../../services/sesion-status.service';
declare  var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  user: User = {
    email: '',
    password: '',
    token: ''
  };

  constructor( private router: Router,
               private controller: ControllerService,
               private sesionStatus: SesionStatusService) {
    this.sesionStatus.checkLogged();
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    $(document).ready(function() {
      $('.collapsible').collapsible();
    });
    if(localStorage.getItem('user')){
      if(JSON.parse(localStorage.getItem('user')).userDB){
        this.router.navigate( ['/iUnidUser']);
      } else {
        this.router.navigate( ['/iUnidCompany']);
      }
    }
  }

  regUser() {
    this.router.navigate( ['/regUser']);
  }

  regCompany() {
    this.router.navigate( ['/regCompany']);
  }

  sendData() {
    this.user = this.form.value;
    this.controller.login(this.user).subscribe( (data: any) => {
      localStorage.setItem('user', JSON.stringify(data));
      if (data.userDB) {
        if (data.userDB.userType === 'USER_ROLE') {
          this.router.navigate( ['/iUnidUser']);
        }
      }
      if (data.companyDB) {
        if (data.companyDB.userType === 'COMPANY_ROLE') {
          this.router.navigate( ['/iUnidCompany']);
        }
      }
    }, error => console.log(error));
  }
}