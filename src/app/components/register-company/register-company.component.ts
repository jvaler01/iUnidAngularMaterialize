import {Component, forwardRef, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ControllerService } from '../../services/controller.service';
import {ErrorServiceService} from '../../services/error-service.service';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.css']
})
export class RegisterCompanyComponent implements OnInit {
  form: FormGroup;
  data: any = {
  };
  imageUpload: File = null;
  constructor(private router: Router,
              private messageService: ErrorServiceService,
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
      img: new FormControl()
    });
    this.form.controls['repeatPassword'].setValidators([
      Validators.required,
      this.noIgual.bind( this.form )
    ]);
  }

  ngOnInit() {
  }
  selectionImage( file: File ) {
    if ( !file ) {
      this.imageUpload = null;
      return;
    }

    if ( file.type.indexOf('image') < 0 ) {
      this.imageUpload = null;
      return;
    }

    this.imageUpload = file;
    console.log(this.imageUpload)
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
    let companySesion2 = JSON.parse(localStorage.getItem('user'));
    let email2 = companySesion2.companyDB.email;
    if(this.imageUpload !== null){
      this.saveImg(email2);
    }
    console.log(this.form.get('img'));
    let companyData:any = {};
    companyData.name = this.form.get('name').value;
    companyData.password = this.form.get('password').value;
    companyData.cif = this.form.get('cif').value;
    companyData.description = this.form.get('desc').value;
    companyData.contactEmail = this.form.get('contactEmail').value;
    companyData.img = ':)';
    console.log(companyData);
    let userSesion = JSON.parse(localStorage.getItem('user'));
    if(JSON.parse(localStorage.getItem('user'))){
      companyData.userType = userSesion.userDB.userType;
    } else {
      companyData.userType = 'COMPANY_ROLE';
    }
    if(companyData.userType === 'COMPANY_ROLE') {
      companyData.email = this.form.get('email').value;
      this.controller.registerCompany(companyData).subscribe(data => {
        this.data = data;
        if(this.data.err){
          this.messageService.takeMessage(this.data.err.message);
          this.router.navigate( ['/error']);
        }else{
          if(this.data.err){
            alert(this.data.err);
          }else{
            this.router.navigate(['/login']);
          }
        }
      }, error => {
        console.log(error);
        this.messageService.takeMessage(error.err.message);
        this.router.navigate( ['/error']);
      });
    }else if(companyData.userType === 'ADMIN_ROLE'){
      companyData.email = userSesion.userDB.email;
      companyData.userEmail = this.form.get('email').value;
      companyData.newUserType = 'COMPANY_ROLE';
      this.controller.newUserOrCompany( userSesion.token, companyData).subscribe( data => {
        this.data = data;
        if(this.data.err){
          this.messageService.takeMessage(this.data.err.message);
          this.router.navigate( ['/error']);
        }else {
          this.router.navigate(['**']);
        }
      }, error => {
        console.log(error);
        this.messageService.takeMessage(error.err.message);
        this.router.navigate( ['/error']);
      });
    }
    console.log(this.form.value);
  }
  saveImg(email: any){
    this.controller.saveImg(this.imageUpload, email).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}
