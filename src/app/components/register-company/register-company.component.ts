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
    let companyData:any = {};
    companyData.name = this.form.get('name').value;
    companyData.email = this.form.get('email').value;
    companyData.password = this.form.get('password').value;
    companyData.cif = this.form.get('cif').value;
    companyData.description = this.form.get('desc').value;
    companyData.contactEmail = this.form.get('contactEmail').value;
    companyData.img = ':)';
    console.log(companyData);
    this.controller.registerCompany(companyData).subscribe( data => {
      this.router.navigate( ['/login']);
    }, error => console.log(error));
    console.log(this.form.value);
  }
}
