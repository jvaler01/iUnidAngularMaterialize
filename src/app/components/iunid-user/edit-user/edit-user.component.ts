import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../models/User';
import {Router} from '@angular/router';
import {ControllerService} from '../../../services/controller.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit, OnDestroy {
  form: FormGroup;
  data: any = {
  };
  user: any = {};
  constructor(private router: Router,
              private controller: ControllerService) {
    this.data = JSON.parse(localStorage.getItem('dataUser'));
    console.log("this.user");
    console.log(this.data);
    this.user.name = this.data.name.split(' ')[0];
    this.user.lastName = this.data.name.split(' ')[1] + ' ' + this.data.name.split(' ')[2];
    this.user.description = this.data.description;
    this.user.courses = this.data.courses;
    this.user.certificates = this.data.certificates;
    this.user.skills = this.data.skills;
    this.user.phone = this.data.phone;
    this.form = new FormGroup({
      name: new FormControl(this.user.name),
      lastName: new FormControl(this.user.lastName),
      desc: new FormControl(this.user.description, Validators.minLength(50)),
      courses: new FormControl(this.user.courses),
      certificates: new FormControl(this.user.certificates),
      skills: new FormControl(this.user.skills),
      phoneNumber: new FormControl(this.user.phone),
    });
    console.log(this.form);
  }

  ngOnInit() {
  }

  sendData() {
    let userData:any = {};
    userData.name = this.form.get('name').value + ' ' + this.form.get('lastName').value;
    userData.courses = this.form.get('courses').value;
    userData.certificates = this.form.get('certificates').value;
    userData.skills = this.form.get('skills').value;
    userData.phone = this.form.get('phoneNumber').value;
    console.log(userData);
    let userSesion = JSON.parse(localStorage.getItem('user'));
    userData.email = userSesion.userDB.email;
    console.log(userData);
    this.controller.editUser( userSesion.token, userData).subscribe( data => {
      this.router.navigate( ['/iUnidUser/UserProfile']);
    }, error => console.log(error));

    localStorage.removeItem('dataUser');
    console.log(this.form.value);
  }

  ngOnDestroy(): void {
    localStorage.removeItem('dataUser');
  }
}
