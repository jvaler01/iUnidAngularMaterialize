import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ControllerService} from '../../../services/controller.service';
import {ErrorServiceService} from '../../../services/error-service.service';
declare  var $: any;
@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {
  user: any = {
  };
  data: any = {
    user:{
      'name':''
    }
  };
  projectId;
  checkProjectRequestError:any;
  projectRequest:any = {
    messages:{}
  };
  project: any = {
    internalProject: {}
  };
  constructor( private controller: ControllerService,
               private router: Router,
               private messageService: ErrorServiceService) {
    //this.messages.getData().subscribe(data=>console.log(data));
    this.user = JSON.parse(localStorage.getItem('user'));
    this.controller.getUser(this.user.token, this.user.userDB.email).subscribe( data => {
      this.data = data;
      if(this.data.err){
        this.messageService.takeMessage(this.data.err.message);
        this.router.navigate( ['/error']);
      }
    }, error => {
      console.log(error);
      this.messageService.takeMessage(error.err.message);
      this.router.navigate( ['/error']);
    });
    this.controller.getUserMessages(this.user.token, this.user.userDB.email).subscribe( data => {
      this.checkProjectRequestError = data;
      if(this.checkProjectRequestError.err){
        this.messageService.takeMessage(this.data.err.message);
        this.router.navigate( ['/error']);
      }
      this.projectRequest = data;
      this.checkProjectRequestError = this.projectRequest.messages.pendingMessages.length;
    }, error => {
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
    $('.dropdown-trigger').dropdown();
  }

  edit(){
    localStorage.setItem('dataUser', JSON.stringify(this.data.user));
    this.router.navigate( ['/iUnidUser/editProfile']);
  }

  editExt(project:any){
    console.log(project);
    localStorage.setItem('dataProject', JSON.stringify(project));
    this.router.navigate( ['/iUnidUser/editExt']);
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
      }else{
        $('#deleteModal').modal('close');
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    }, error => {
      console.log(error);
      $('#deleteModal').modal('close');
      this.messageService.takeMessage(error.err.message);
      this.router.navigate( ['/error']);
    });
  }

  setProjectId(projectId: any){
    this.projectId = projectId;
  }

  deleteProject(projectId: any){
    console.log(projectId);
    this.controller.deleteExternalProject(this.user.token, projectId, this.user.userDB.email).subscribe( data => {

      this.data = data;
      if(this.data.err){
        $('#deleteProjectModal').modal('close');
        this.messageService.takeMessage(this.data.err.message);
        this.router.navigate( ['/error']);
      }else {
        this.refreshData();
        $('#deleteProjectModal').modal('close');
      }
    }, error => {
      $('#deleteProjectModal').modal('close');
      this.messageService.takeMessage(error.err.message);
      this.router.navigate( ['/error']);
    });
  }

  showProject(idProject: any){
    console.log(idProject);
    this.controller.getProjectsById(this.user.token, this.user.userDB.email, idProject).subscribe( data =>{
      this.project = data;
      if(this.project.err){
        this.messageService.takeMessage(this.data.err.message);
        this.router.navigate( ['/error']);
      }
      console.log(this.project);
      $('#projectModal').modal('open');
    },error => {
      console.log(error);
      this.messageService.takeMessage(error.err.message);
      this.router.navigate( ['/error']);
    });
  }

  acceptOffer(idProject: any){
    console.log(idProject);
    this.controller.acceptOffer(this.user.token, this.user.userDB.email, idProject).subscribe( data =>{
      if(this.project.err){
        $('#projectModal').modal('close');
        this.messageService.takeMessage(this.data.err.message);
        this.router.navigate( ['/error']);
      } else {
        this.refreshData();
        $('#projectModal').modal('close');
      }
    },error => {
      console.log(error);
      $('#projectModal').modal('close');
      this.messageService.takeMessage(error.err.message);
      this.router.navigate( ['/error']);
    });
  }

  denyOffer(idProject: any){
    console.log(idProject);
    this.controller.denyOffer(this.user.token, this.user.userDB.email, idProject).subscribe( data =>{
      if(this.project.err){
        $('#projectModal').modal('close');
        this.messageService.takeMessage(this.data.err.message);
        this.router.navigate( ['/error']);
      } else {
        this.refreshData();
        $('#projectModal').modal('close');
      }
    },error => {
      console.log(error);
      $('#projectModal').modal('close');
      this.messageService.takeMessage(error.err.message);
      this.router.navigate( ['/error']);
    });
  }

  refreshData(){
    this.controller.getUser(this.user.token, this.user.userDB.email).subscribe( data => {
      this.data = data;
      console.log(this.data);
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
    this.controller.getUserMessages(this.user.token, this.user.userDB.email).subscribe( data => {
      this.checkProjectRequestError = data;
      if(this.checkProjectRequestError.err){
        this.messageService.takeMessage(this.data.err.message);
        this.router.navigate( ['/error']);
      }
      this.projectRequest = data;
      this.checkProjectRequestError = this.projectRequest.messages.pendingMessages.length;
      console.log(this.checkProjectRequestError);
      console.log(this.projectRequest);
    }, error => {
      console.log(error);
      this.messageService.takeMessage(error.err.message);
      this.router.navigate( ['/error']);
    });
  }
}
