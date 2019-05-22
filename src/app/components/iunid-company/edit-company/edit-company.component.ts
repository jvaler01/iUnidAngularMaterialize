import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ControllerService} from '../../../services/controller.service';
import {ErrorServiceService} from '../../../services/error-service.service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit, OnDestroy {
  form: FormGroup;
  data: any = {
  };
  company: any = {};
  imageUpload: File = null;
  constructor(private router: Router,
              private messageService: ErrorServiceService,
              private controller: ControllerService) {
    this.data = JSON.parse(localStorage.getItem('dataCompany'));
    this.company.name = this.data.name;
    this.company.description = this.data.description;
    this.company.contactEmail = this.data.contactEmail;
    this.form = new FormGroup({
      name: new FormControl(this.company.name, Validators.required),
      desc: new FormControl(this.company.description, Validators.minLength(50)),
      contactEmail: new FormControl(this.company.contactEmail, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')),
    });
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
  sendData() {
    let companySesion2 = JSON.parse(localStorage.getItem('user'));
    let email2 = companySesion2.companyDB.email;
    if(this.imageUpload !== null){
      this.saveImg(email2);
    }
    let companyData:any = {};
    companyData.name = this.form.get('name').value;
    companyData.description = this.form.get('desc').value;
    companyData.contactEmail = this.form.get('contactEmail').value;
    companyData.img = ':)';
    console.log(companyData);
    let companySesion = JSON.parse(localStorage.getItem('user'));
    console.log(companyData);
    if(companySesion.companyDB) {
      companyData.email = companySesion.companyDB.email;
      this.controller.editCompany(companySesion.token, companyData).subscribe(data => {
        this.data = data;
        if(this.data.err){
          this.messageService.takeMessage(this.data.err.message);
          this.router.navigate( ['/error']);
        }else {
          this.router.navigate(['/iUnidCompany/CompanyProfile']);
        }
      }, error => {
        console.log(error);
        this.messageService.takeMessage(error.err.message);
        this.router.navigate( ['/error']);
      });
    } else if(companySesion.userDB) {
      companyData.email = companySesion.userDB.email;
      companyData.userType = companySesion.userDB.userType;
      companyData.userEmail = this.data.email;
      this.controller.editCompanyAdmin(companySesion.token, companyData).subscribe(data => {
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
    localStorage.removeItem('dataCompany');
    console.log(this.form.value);
  }

  saveImg(email: any){
    this.controller.saveImg(this.imageUpload, email).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  ngOnDestroy(): void {
    localStorage.removeItem('dataCompany');
  }
}
