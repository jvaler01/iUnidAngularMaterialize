import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ControllerService} from '../../../services/controller.service';

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
  constructor(private router: Router,
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

  sendData() {
    let companyData:any = {};
    companyData.name = this.form.get('name').value;
    companyData.description = this.form.get('desc').value;
    companyData.contactEmail = this.form.get('contactEmail').value;
    companyData.img = ':)';
    console.log(companyData);
    let companySesion = JSON.parse(localStorage.getItem('user'));
    companyData.email = companySesion.companyDB.email;
    console.log(companyData);
    this.controller.editCompany(companySesion.token, companyData).subscribe( data => {
      this.router.navigate( ['/iUnidCompany/CompanyProfile']);
    }, error => console.log(error));

    localStorage.removeItem('dataCompany');
    console.log(this.form.value);
  }


  ngOnDestroy(): void {
    localStorage.removeItem('dataCompany');
  }
}
