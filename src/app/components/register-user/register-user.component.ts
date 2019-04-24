import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/User';
import { ControllerService } from '../../services/controller.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  form: FormGroup;
  user: User = {
    email: '',
    password: '',
    token: ''
  };
  constructor(private router: Router,
              private controller: ControllerService) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      password: new FormControl('', Validators.required),
      repeatPassword: new FormControl(),
      desc: new FormControl('', Validators.minLength(50)),
      courses: new FormControl(''),
      certificates: new FormControl(''),
      skills: new FormControl(''),
      phoneNumber: new FormControl(''),
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
    userData.name = this.form.get('name').value + ' ' + this.form.get('lastName').value;
    userData.email = this.form.get('email').value;
    userData.description = this.form.get('desc').value;
    userData.password = this.form.get('password').value;
    userData.courses = this.form.get('courses').value;
    userData.certificates = this.form.get('certificates').value;
    userData.skills = this.form.get('skills').value;
    userData.phone = this.form.get('phoneNumber').value;
    console.log(userData);
    this.controller.registerUser(userData).subscribe( data => {
      this.router.navigate( ['/login']);
    }, error => console.log(error));
    console.log(this.form.value);
  }
}
