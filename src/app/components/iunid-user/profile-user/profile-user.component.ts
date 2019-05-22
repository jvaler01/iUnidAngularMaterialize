import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ControllerService} from '../../../services/controller.service';
import {MessagesService} from '../../../services/sockets/messages.service';
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
  constructor( private controller: ControllerService,
               private router: Router,
               private messageService: ErrorServiceService,
               private messages: MessagesService) {
    //this.messages.getData().subscribe(data=>console.log(data));
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log("this.user");
    console.log(this.user.token);
    console.log(this.user.userDB.email);
    this.controller.getUser(this.user.token, this.user.userDB.email).subscribe( data => {
      this.data = data;
      //this.data.user.img = 'image-155.jpg';
      this.data.user.img = 'image-1558281501964.jpg';
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
  ngOnInit() {
    $(document).ready(function() {
      $('.collapsible').collapsible();
    });

    $(document).ready(function(){
      $('.modal').modal();
    });
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
        this.messageService.takeMessage(this.data.err.message);
        this.router.navigate( ['/error']);
      }else{
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    }, error => {
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
    this.controller.deleteExternalProject(this.user.token, projectId, this.user.userDB.email).subscribe( data => {
      console.log(data);
      this.data = data;
      if(this.data.err){
        this.messageService.takeMessage(this.data.err.message);
        this.router.navigate( ['/error']);
      }else {
        this.router.navigate(['/userProfile']);
      }
    }, error => {
      console.log(error);
      this.messageService.takeMessage(error.err.message);
      this.router.navigate( ['/error']);
    });
  }
}
