import { Component, OnInit } from '@angular/core';
import {ControllerService} from '../../../services/controller.service';
import {ErrorServiceService} from '../../../services/error-service.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
declare var $: any;
declare var M: any;
@Component({
  selector: 'app-search-colaborator',
  templateUrl: './search-colaborator.component.html',
  styleUrls: ['./search-colaborator.component.css']
})
export class SearchColaboratorComponent implements OnInit {
  form: FormGroup;
  user: any = {};
  data: any = {};
  skills:any = [];
  courses:any = [];
  certificates:any = [];
  companyProjects:any;
  colaboratorId: any;
  constructor( private messageService: ErrorServiceService,
               private router: Router,
               private controller: ControllerService ) {
    this.form = new FormGroup({
      idProject: new FormControl('0', Validators.pattern('[^0]+')),
    });
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log("this.user");
    console.log(this.user.token);
    console.log(this.user.companyDB.email);
    this.controller.getProjectsNameAndId(this.user.token, this.user.companyDB.email).subscribe(data =>{
      // @ts-ignore
      this.companyProjects = data.internalProjects;
      console.log(this.companyProjects)
    }, error =>{
      this.messageService.takeMessage(error.err.message);
      this.router.navigate( ['/error']);
    });
  }

  ngOnInit() {

    $(document).ready(function(){
      $('select').formSelect();
    });
    $(document).ready(function() {
      $('.collapsible').collapsible();
    });

    $('.chips').chips();

    $(document).ready(function(){
      $('.tooltipped').tooltip();
    });
    $(document).ready(function(){
      $('.modal').modal();
    });
  }

  takeData(data: any, option:string ){
    this.skills = [];
    this.certificates = [];
    this.courses = [];
    var chipData= M.Chips.getInstance($('.chips-skills')).chipsData;
    if( chipData.length !== 0) {
      for (let i = 0; i < chipData.length; i++){
        this.skills.push(chipData[i].tag);
      }
    }
    var chipData= M.Chips.getInstance($('.chips-certificates')).chipsData;
    if( chipData.length !== 0) {
      for (let i = 0; i < chipData.length; i++){
        this.certificates.push(chipData[i].tag);
      }
    }
    var chipData= M.Chips.getInstance($('.chips-courses')).chipsData;
    if( chipData.length !== 0) {
      for (let i = 0; i < chipData.length; i++){
        this.courses.push(chipData[i].tag);
      }
    }
    console.log(this.skills);
    console.log(this.certificates);
    console.log(this.courses);
    if(option === 'skills'){
      //this.categ = this.categ.split(',');
      //console.log(this.categ);
      this.controller.getUsersBySkills(this.user.token, this.user.companyDB.email, this.skills).subscribe( data => {
        this.data = data;
        if(this.data.err){
          this.messageService.takeMessage(this.data.err.message);
          this.router.navigate( ['/error']);
        }
        console.log(this.data);
      }, error => {
        console.log(error);
        this.messageService.takeMessage(error.err.message);
        this.router.navigate( ['/error']);
      });
    }
    if(option === 'certificates'){
      //this.categ = this.categ.split(',');
      //console.log(this.categ);
      this.controller.getUsersByCertificates(this.user.token, this.user.companyDB.email, this.certificates).subscribe( data => {
        this.data = data;
        if(this.data.err){
          this.messageService.takeMessage(this.data.err.message);
          this.router.navigate( ['/error']);
        }
        console.log(this.data);
      }, error => {
        console.log(error);
        this.messageService.takeMessage(error.err.message);
        this.router.navigate( ['/error']);
      });
    }
    if(option === 'courses'){
      //this.categ = this.categ.split(',');
      //console.log(this.categ);
      this.controller.getUsersByCourses(this.user.token, this.user.companyDB.email, this.courses).subscribe( data => {
        this.data = data;
        if(this.data.err){
          this.messageService.takeMessage(this.data.err.message);
          this.router.navigate( ['/error']);
        }
        console.log(this.data);
      }, error => {
        console.log(error);
        this.messageService.takeMessage(error.err.message);
        this.router.navigate( ['/error']);
      });
    }
  }

  setColaboratorId(id: string){
    this.colaboratorId = id;
  }
  sendColaboratorRequest(){
    this.controller.sendMessageCollaborator(this.user.token, this.form.get("idProject").value, this.colaboratorId, this.user.companyDB.email).subscribe( data => {
      this.data = data;
      if(this.data.err){
        this.messageService.takeMessage(this.data.err.message);
        this.router.navigate( ['/error']);
      } else {
        $(document).ready(function(){
          $('.modal').modal('close');

        });
      }
      console.log(this.data);
    }, error => {
      console.log(error);
      this.messageService.takeMessage(error.err.message);
      this.router.navigate( ['/error']);
    });
  }
}
