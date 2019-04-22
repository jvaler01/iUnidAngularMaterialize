import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ControllerService} from '../../../services/controller.service';
import {MessagesService} from '../../../services/sockets/messages.service';
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
  constructor( private controller: ControllerService,
               private router: Router,
               private messages: MessagesService) {
    //this.messages.getData().subscribe(data=>console.log(data));
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log("this.user");
    console.log(this.user.token);
    console.log(this.user.userDB.email);

    this.controller.getUser(this.user.token, this.user.userDB.email).subscribe( data => {
      this.data = data;
      console.log(this.data);
    }, error => {
      console.log(error);
      this.router.navigate( ['errors']);
    });
  }
  ngOnInit() {
    $(document).ready(function() {
      $('.collapsible').collapsible();
    });
  }
}
