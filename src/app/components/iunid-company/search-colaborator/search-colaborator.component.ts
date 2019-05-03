import { Component, OnInit } from '@angular/core';
import {ControllerService} from '../../../services/controller.service';
declare var $: any;
declare var M: any;
@Component({
  selector: 'app-search-colaborator',
  templateUrl: './search-colaborator.component.html',
  styleUrls: ['./search-colaborator.component.css']
})
export class SearchColaboratorComponent implements OnInit {

  user: any = {};
  data: any = {};
  skills:any = [];
  courses:any = [];
  certificates:any = [];
  constructor( private controller: ControllerService ) {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log("this.user");
    console.log(this.user.token);
    console.log(this.user.companyDB.email);


  }

  ngOnInit() {

    $(document).ready(function() {
      $('.collapsible').collapsible();
    });

    $('.chips').chips();

    $(document).ready(function(){
      $('.tooltipped').tooltip();
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
    console.log(data);
    if(option === 'skills'){
      //this.categ = this.categ.split(',');
      //console.log(this.categ);
      this.controller.getUsersBySkills(this.user.token, this.user.companyDB.email, this.skills).subscribe( data => {
        this.data = data;
        console.log(this.data);
      }, error => console.log(error));
    }
    if(option === 'certificates'){
      //this.categ = this.categ.split(',');
      //console.log(this.categ);
      this.controller.getUsersByCertificates(this.user.token, this.user.companyDB.email, this.certificates).subscribe( data => {
        this.data = data;
        console.log(this.data);
      }, error => console.log(error));
    }
    if(option === 'courses'){
      //this.categ = this.categ.split(',');
      //console.log(this.categ);
      this.controller.getUsersByCourses(this.user.token, this.user.companyDB.email, this.courses).subscribe( data => {
        this.data = data;
        console.log(this.data);
      }, error => console.log(error));
    }
  }


  joinProject(projectId: any){
    console.log(projectId);
    this.controller.joinProject(this.user.token, this.user.companyDB.email, projectId).subscribe( data => {
      this.data = data;
      console.log(this.data);
    }, error => console.log(error));
  }

}
