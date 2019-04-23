import { Component, OnInit } from '@angular/core';
import {ControllerService} from '../../../services/controller.service';
import {MessagesService} from '../../../services/sockets/messages.service';
import {Router} from '@angular/router';

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
  contactsCont : number;
  constructor( private controller: ControllerService,
               private router: Router,
               private messages: MessagesService) {

    //this.messages.getData().subscribe(data=>console.log(data));
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log("this.user");
    console.log(this.user.token);
    console.log(this.user.companyDB.email);

    this.controller.getCompany(this.user.token, this.user.companyDB.email).subscribe( data => {
      this.data = data;
      console.log(this.data);
      this.contactsCont = Object.keys(this.data.company.contacts[0]).length;
    }, error => console.log(error));
  }

  ngOnInit() {
  }
  edit(){
    localStorage.setItem('dataCompany', JSON.stringify(this.data.company));
    this.router.navigate( ['/iUnidCompany/editProfile']);
  }
}
