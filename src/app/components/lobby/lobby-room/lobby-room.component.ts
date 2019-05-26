import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ErrorServiceService} from '../../../services/error-service.service';
import {ControllerService} from '../../../services/controller.service';

@Component({
  selector: 'app-lobby-room',
  templateUrl: './lobby-room.component.html',
  styleUrls: ['./lobby-room.component.css']
})
export class LobbyRoomComponent implements OnInit {
  projects: any = [];
  projectsThatHeWorks: any = [];
  client = true;
  email: string;
  type: string;
  user: any = {};
  data: any = {};
  constructor(private router: Router,
              private messageService: ErrorServiceService,
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
        this.projectsThatHeWorks = data;
        if(this.projectsThatHeWorks.err){
          this.messageService.takeMessage(this.projectsThatHeWorks.err.message);
          this.router.navigate( ['/error']);
        }
        console.log(this.projectsThatHeWorks);
      }, error => {
        this.messageService.takeMessage(error.err.message);
        this.router.navigate( ['/error']);
      });

    } else if(this.user.companyDB){
      console.log(this.user.companyDB.email);
      this.email = this.user.companyDB.email;
      this.type = 'company';
    }

    this.controller.getProjects(this.user.token, this.email).subscribe( data => {
      this.projects = data;
      console.log(this.projects);
      if(this.projects.err){
        this.messageService.takeMessage(this.projects.err.message);
        this.router.navigate( ['/error']);
      }
    }, error => {
      this.messageService.takeMessage(error.err.message);
      this.router.navigate( ['/error']);
    });
  }

  ngOnInit() {
  }


  joinChat(chatId: any, projectName: any){
    localStorage.setItem("chatID", chatId);
    localStorage.setItem("projectName", projectName);
    this.router.navigate( ['/iUnidUser/chat']);
  }
}
