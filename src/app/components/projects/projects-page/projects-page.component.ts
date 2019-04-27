import { Component, OnInit } from '@angular/core';
import {ControllerService} from '../../../services/controller.service';
import {Router} from '@angular/router';
declare  var $: any;

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.css']
})
export class ProjectsPageComponent implements OnInit {

  data1: any = [];
  data2: any = [];
  email: string;
  type: string;
  user: any = {};
  data: any = {};
  projectId;
  constructor( private router: Router,
               private controller: ControllerService ) {
    // this.data = this.data1;
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log("this.user");
    console.log(this.user.token);
    if (this.user.userDB) {
      console.log(this.user.userDB.email);
      this.email = this.user.userDB.email;
      this.type = 'user';

      this.controller.getProjectsThatHeWorks(this.user.token, this.email).subscribe( data => {
        this.data2 = data;
        console.log(this.data2);
      }, error => console.log(error));

    } else if(this.user.companyDB){
      console.log(this.user.companyDB.email);
      this.email = this.user.companyDB.email;
      this.type = 'company';
    }

    this.controller.getProjects(this.user.token, this.email).subscribe( data => {
      this.data1 = data;
      console.log(this.data1);
      this.data = this.data1;
    }, error => console.log(error));
  }

  ngOnInit() {
    $(document).ready(function() {
      $('.collapsible').collapsible();
    });
    $(document).ready(function(){
      $('ul.tabs').tabs({
        swipeable : true,
        responsiveThreshold : 1920
      });
    });
    $(document).ready(function(){
      $('.modal').modal();
    });


  }

  load(param: string) {
    if(param === 'client'){
      this.data = null;
      this.data = this.data1
    }
    if(param === 'employer'){
      this.data = null;
      this.data = this.data2
    }
  }

  editInt(project:any){
    console.log(project);
    localStorage.setItem('dataProject', JSON.stringify(project));
    if(JSON.parse(localStorage.getItem('user')).userDB){
      this.router.navigate( ['/iUnidUser/editInt']);
    } else {
      this.router.navigate( ['/iUnidCompany/editInt']);
    }
  }

  setProjectId(projectId: any){
    this.projectId = projectId;
  }

  deleteProject(projectId: any){
    console.log(projectId);
    let email: any;
    if(JSON.parse(localStorage.getItem('user')).userDB){
      email = this.user.userDB.email
    } else {
      email = this.user.companyDB.email
    }
    this.controller.deleteInternalProject(this.user.token, projectId, email).subscribe( data => {
      console.log(data);
      if(JSON.parse(localStorage.getItem('user')).userDB){
        this.router.navigate( ['userProjects']);
      } else {
        this.router.navigate( ['companyProjects']);
      }
    }, error => {
      console.log(error);
      this.router.navigate( ['errors']);
    });
  }

  acceptPending(projectId: any, userEmail: any){
    let email: any;
    if(JSON.parse(localStorage.getItem('user')).userDB){
      email = this.user.userDB.email
    } else {
      email = this.user.companyDB.email
    }
    this.controller.acceptPendingRequest(this.user.token, email, projectId, userEmail).subscribe( data => {
      console.log(data);
      if(JSON.parse(localStorage.getItem('user')).userDB){
        this.router.navigate( ['userProjects']);
      } else {
        this.router.navigate( ['companyProjects']);
      }
    }, error => {
      console.log(error);
      this.router.navigate( ['errors']);
    });
  }

  denyPending(projectId: any, userEmail: any){
    let email: any;
    if(JSON.parse(localStorage.getItem('user')).userDB){
      email = this.user.userDB.email
    } else {
      email = this.user.companyDB.email
    }
    this.controller.denyPendingRequest(this.user.token, email, projectId, userEmail).subscribe( data => {
      console.log(data);
      if(JSON.parse(localStorage.getItem('user')).userDB){
        this.router.navigate( ['userProjects']);
      } else {
        this.router.navigate( ['companyProjects']);
      }
    }, error => {
      console.log(error);
      this.router.navigate( ['errors']);
    });
  }

  closeProject(projectId: any){
    let email: any;
    if(JSON.parse(localStorage.getItem('user')).userDB){
      email = this.user.userDB.email
    } else {
      email = this.user.companyDB.email
    }
    this.controller.closeProject(this.user.token, email, projectId).subscribe( data => {
      console.log(data);
      if(JSON.parse(localStorage.getItem('user')).userDB){
        this.router.navigate( ['userProjects']);
      } else {
        this.router.navigate( ['companyProjects']);
      }
    }, error => {
      console.log(error);
      this.router.navigate( ['errors']);
    });
  }

  kickPerson(projectId: any, userEmail: any) {
    let email: any;
    if(JSON.parse(localStorage.getItem('user')).userDB){
      email = this.user.userDB.email
    } else {
      email = this.user.companyDB.email
    }
    this.controller.kickPerson(this.user.token, email, projectId, userEmail).subscribe( data => {
      console.log(data);
      if(JSON.parse(localStorage.getItem('user')).userDB){
        this.router.navigate( ['userProjects']);
      } else {
        this.router.navigate( ['companyProjects']);
      }
    }, error => {
      console.log(error);
      this.router.navigate( ['errors']);
    });
  }
}
