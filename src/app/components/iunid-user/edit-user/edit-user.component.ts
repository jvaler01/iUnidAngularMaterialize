import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../models/User';
import {Router} from '@angular/router';
import {ControllerService} from '../../../services/controller.service';
declare var $: any;
declare var M: any;


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
  skillsTags:any = [];
  coursesTags:any = [];
  certificatesTags:any = [];
  validSkills = false;
  validCourses = false;
  validCertificates = false;
  valid = false;
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
      name: new FormControl(this.user.name, Validators.required),
      lastName: new FormControl(this.user.lastName, Validators.required),
      desc: new FormControl(this.user.description, Validators.minLength(50)),
      courses: new FormControl(this.user.courses),
      certificates: new FormControl(this.user.certificates),
      skills: new FormControl(this.user.skills),
      phoneNumber: new FormControl(this.user.phone),
    });
    console.log(this.form);
  }

  ngOnInit() {
    $('.chips').chips();

    $(document).ready(function(){
      $('.tooltipped').tooltip();
    });
    let skillsTags = [];
    let coursesTags = [];
    let certificatesTags = [];
    for (let i = 0; i < this.user.skills.length; i++) {
      skillsTags.push({tag: this.user.skills[i]})
    }
    if(this.user.skills.length != 0){
      this.validSkills = true;
    }
    $('.chips-skills').chips({
      data: skillsTags,
    });
    for (let i = 0; i < this.user.certificates.length; i++) {
      certificatesTags.push({tag: this.user.certificates[i]})
    }
    if(this.user.certificates.length != 0){
      this.validCertificates = true;
    }
    $('.chips-certificates').chips({
      data: certificatesTags,
    });
    for (let i = 0; i < this.user.courses.length; i++) {
      coursesTags.push({tag: this.user.courses[i]})
    }
    if(this.user.courses.length != 0){
      this.validCourses = true;
    }
    $('.chips-courses').chips({
      data: coursesTags,
    });
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
    userData.courses = this.coursesTags;
    userData.certificates = this.certificatesTags;
    userData.skills = this.skillsTags;
    userData.phone = this.form.get('phoneNumber').value;
    console.log(userData);
    let userSesion = JSON.parse(localStorage.getItem('user'));
    userData.email = userSesion.userDB.email;
    userData.userType = userSesion.userDB.userType;
    console.log(userSesion);
    if(userData.userType === 'USER_ROLE'){
      this.controller.editUser( userSesion.token, userData).subscribe( data => {
        this.router.navigate( ['/iUnidUser/UserProfile']);
      }, error => console.log(error));
    }else if(userData.userType === 'ADMIN_ROLE'){
      this.controller.editUserAdmin( userSesion.token, userData).subscribe( data => {
        this.router.navigate( ['**']);
      }, error => console.log(error));
    }

    localStorage.removeItem('dataUser');
    console.log(this.form.value);
  }

  ngOnDestroy(): void {
    localStorage.removeItem('dataUser');
  }
}
