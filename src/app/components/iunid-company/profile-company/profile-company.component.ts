import { Component, OnInit } from '@angular/core';
import {ControllerService} from '../../../services/controller.service';
import {Router} from '@angular/router';
import {ErrorServiceService} from '../../../services/error-service.service';
declare  var $: any;

@Component({
  selector: 'app-profile-company',
  templateUrl: './profile-company.component.html',
  styleUrls: ['./profile-company.component.css']
})
export class ProfileCompanyComponent implements OnInit {
  user: any = {};
  data: any = {
    company:{
      'name':''
    }
  };
  projectId;
  constructor( private controller: ControllerService,
               private router: Router,
               private messageService: ErrorServiceService) {

    //this.messages.getData().subscribe(data=>console.log(data));
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log("this.user");
    console.log(this.user.token);
    console.log(this.user.companyDB.email);

    this.controller.getCompany(this.user.token, this.user.companyDB.email).subscribe( data => {
      this.data = data;
      console.log(this.data);
      if(this.data.err){
        this.messageService.takeMessage(this.data.err.message);
        this.router.navigate( ['/error']);
      }else {
        console.log(this.data);
      }
    }, error => {
      console.log(error);
      this.messageService.takeMessage(error.err.message);
      this.router.navigate( ['/error']);
    });
  }

  ngOnInit() {
    $(document).ready(function() {
      $('.collapsible').collapsible();
    });

    $(document).ready(function(){
      $('.modal').modal();
    });
  }

  edit(){
    localStorage.setItem('dataCompany', JSON.stringify(this.data.company));
    this.router.navigate( ['/iUnidCompany/editProfile']);
  }

  editExt(project:any){
    console.log(project);
    localStorage.setItem('dataProject', JSON.stringify(project))
    this.router.navigate( ['/iUnidCompany/editExt']);
  }

  deleteUser(userEmail: any){
    console.log(userEmail);
    this.controller.deleteUserOrCompany(this.user.token, userEmail).subscribe( data => {
      console.log(data);
      this.data = data;
      if(this.data.err){
        $('#deleteModal').modal('close');
        this.messageService.takeMessage(this.data.err.message);
        this.router.navigate( ['/error']);
      }else {
        $('#deleteModal').modal('close');
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    }, error => {
      $('#deleteModal').modal('close');
      console.log(error);
      this.messageService.takeMessage(error.err.message);
      this.router.navigate( ['/error']);
    });
  }

  setProjectId(projectId: any){
    this.projectId = projectId;
  }

  deleteProject(projectId: any){
    console.log(projectId);
    this.controller.deleteExternalProject(this.user.token, projectId, this.user.companyDB.email).subscribe( data => {
      console.log(data);
      this.data = data;
      if(this.data.err){
        $('#deleteProjectModal').modal('close');
        this.messageService.takeMessage(this.data.err.message);
        this.router.navigate( ['/error']);
      } else {
        this.refreshData();
        $('#deleteProjectModal').modal('close');
      }

    }, error => {
      console.log(error);
      $('#deleteProjectModal').modal('close');
      this.messageService.takeMessage(error.err.message);
      this.router.navigate( ['/error']);
    });
  }

  refreshData(){
    this.controller.getCompany(this.user.token, this.user.companyDB.email).subscribe( data => {
      this.data = data;
      console.log(this.data);
      if(this.data.err){
        this.messageService.takeMessage(this.data.err.message);
        this.router.navigate( ['/error']);
      }else {
        console.log(this.data);
      }
    }, error => {
      console.log(error);
      this.messageService.takeMessage(error.err.message);
      this.router.navigate( ['/error']);
    });
  }
}
