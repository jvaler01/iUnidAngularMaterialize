import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/User';
import { ControllerService } from '../../services/controller.service';
import {ErrorServiceService} from '../../services/error-service.service';
declare var $: any;
declare var M: any;

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  form: FormGroup;
  data: any = {};
  user: User = {
    email: '',
    password: '',
    token: ''
  };
  skillsTags:any = [];
  coursesTags:any = [];
  certificatesTags:any = [];
  validSkills = false;
  validCourses = false;
  validCertificates = false;
  valid = false;
  constructor(private router: Router,
              private messageService: ErrorServiceService,
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
    $('.chips').chips();

    $(document).ready(function(){
      $('.tooltipped').tooltip();
    });
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
  checkValid(){
    if(this.validCourses && this.validCertificates && this.validSkills){
      this.valid = true;
    }
  }
  checkCourses(){
    console.log("in");
    let chipData= M.Chips.getInstance($('.chips-courses')).chipsData;
    if( chipData.length !== 0) {
      this.validCourses = true;
    }else{
      this.validCourses = false;
    }
    this.checkValid();
  }
  checkSkills(){
    console.log("in");
    let chipData= M.Chips.getInstance($('.chips-skills')).chipsData;
    if( chipData.length !== 0) {
      this.validSkills = true;
    }else{
      this.validSkills = false;
    }
    this.checkValid();
  }
  checkCertificates(){
    console.log("in");
    let chipData= M.Chips.getInstance($('.chips-certificates')).chipsData;
    if( chipData.length !== 0) {
      this.validCertificates = true;
    }else{
      this.validCertificates = false;
    }
    this.checkValid();
  }

  sendData() {
    let coursesData= M.Chips.getInstance($('.chips-courses')).chipsData;
    if( coursesData.length !== 0) {
      for (let i = 0; i < coursesData.length; i++){
        this.coursesTags.push(coursesData[i].tag);
      }
    }
    let skillsData= M.Chips.getInstance($('.chips-skills')).chipsData;
    if( skillsData.length !== 0) {
      for (let i = 0; i < skillsData.length; i++){
        this.skillsTags.push(skillsData[i].tag);
      }
    }
    let certificatesData= M.Chips.getInstance($('.chips-certificates')).chipsData;
    if( certificatesData.length !== 0) {
      for (let i = 0; i < certificatesData.length; i++){
        this.certificatesTags.push(certificatesData[i].tag);
      }
    }
    let userData:any = {};
    userData.name = this.form.get('name').value + ' ' + this.form.get('lastName').value;
    userData.description = this.form.get('desc').value;
    userData.password = this.form.get('password').value;
    userData.courses = this.coursesTags;
    userData.certificates = this.certificatesTags;
    userData.skills = this.skillsTags;
    userData.phone = this.form.get('phoneNumber').value;
    console.log(userData);
    let userSesion = JSON.parse(localStorage.getItem('user'));
    if(!JSON.parse(localStorage.getItem('user'))) {
      userData.email = this.form.get('email').value;
      this.controller.registerUser(userData).subscribe(data => {
        this.data = data;
        if(this.data.err){
          this.messageService.takeMessage(this.data.err.message);
          this.router.navigate( ['/error']);
        }else {
          this.router.navigate(['/login']);
        }
      }, error => {
        console.log(error);
        this.messageService.takeMessage(error.err.message);
        this.router.navigate( ['/error']);
      });
    }else if(JSON.parse(localStorage.getItem('user'))){
      userData.userType = userSesion.userDB.userType;
      userData.userEmail = this.form.get('email').value;
      userData.email = userSesion.userDB.email;
      userData.newUserType = 'USER_ROLE';
      this.controller.newUserOrCompany( userSesion.token, userData).subscribe( data => {
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
}
