import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ControllerService} from '../../../services/controller.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register-external',
  templateUrl: './register-external.component.html',
  styleUrls: ['./register-external.component.css']
})
export class RegisterExternalComponent implements OnInit {
  form: FormGroup;
  user: any = {};
  constructor(private router: Router,
              private controller: ControllerService) {

    this.user = JSON.parse(localStorage.getItem('user'));
    console.log("this.user");
    console.log(this.user.token);
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.minLength(50)),
      url: new FormControl('')
    });
  }

  ngOnInit() {
  }

  sendData() {
    console.log(this.form);
    let externalProjectData:any = {};
    externalProjectData.email = this.user.userDB.email;
    externalProjectData.name = this.form.get('name').value;
    externalProjectData.description = this.form.get('desc').value;
    externalProjectData.url = this.form.get('url').value;
    console.log(externalProjectData);
    this.controller.createExternalProject(this.user.token, externalProjectData).subscribe( data => {
      // localStorage.setItem('user', JSON.stringify(data));
      // this.router.navigate( ['/iUnidCompany']);
      this.router.navigate( ['/iUnidUser/profile-user']);
    }, error => console.log(error));
    console.log(this.form.value);
  }
}
