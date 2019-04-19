import {Component, forwardRef, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ControllerService } from '../../services/controller.service';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.css']
})
export class RegisterCompanyComponent implements OnInit {
  form: FormGroup;
  constructor(private router: Router,
              private controller: ControllerService) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      cif: new FormControl('', [Validators.required,
        Validators.pattern('^[a-zA-Z]{1}\\d{7}[a-zA-Z0-9]{1}$')]),
      email: new FormControl('', [Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      password: new FormControl('', Validators.required),
      repeatPassword: new FormControl(),
      desc: new FormControl('', Validators.minLength(50)),
      contactEmail: new FormControl('', Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')),
    });
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
    userData.name = this.form.get('name').value;
    userData.email = this.form.get('email').value;
    userData.password = this.form.get('password').value;
    userData.cif = this.form.get('cif').value;
    userData.description = this.form.get('desc').value;
    userData.contactEmail = this.form.get('contactEmail').value;
    userData.img = ':)';
    console.log(userData);
    this.controller.registerCompany(userData).subscribe( data => {
      // localStorage.setItem('user', JSON.stringify(data));
      // this.router.navigate( ['/iUnidCompany']);
      this.router.navigate( ['/login']);
    }, error => console.log(error));
    console.log(this.form.value);
  }
}
