import { Component, OnInit, OnDestroy } from '@angular/core';
import {MessagesService} from '../../../services/sockets/messages.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit, OnDestroy {
  projectID: any;
  user: any = {};
  email: string;
  data: any;
  constructor(private messagesService: MessagesService) {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user.userDB) {
      console.log(this.user.userDB.email);
      this.email = this.user.userDB.email;
    }else {
      console.log(this.user.companyDB.email);
      this.email = this.user.companyDB.email;
    }
    this.projectID = localStorage.getItem("projectID");
    console.log(this.projectID);
    this.messagesService.chatInit(this.email, this.projectID);
    /*this.messagesService.chatLoad()
      .subscribe(data=>this.data = data);*/
    this.messagesService.chatLoad();
    this.messagesService.data.subscribe(data => {
      console.log(data);
      this.data = data});
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    localStorage.removeItem("projectId")
  }

}
