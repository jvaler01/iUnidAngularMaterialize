import { Component, OnInit } from '@angular/core';
import {ControllerService} from '../../../services/controller.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  user: any = {};
  data: any = {};
  usersDB: any = [];
  companiesDB: any = [];
  constructor(private controller: ControllerService,
              private router: Router,) {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log("this.user");
    console.log(this.user.token);
    console.log(this.user.userDB.email);

    this.controller.getUsers(this.user.token, this.user.userDB.email, this.user.userDB.userType).subscribe( data => {
      this.data = data;
      console.log(this.data);
      this.usersDB = this.data.usersDB;
      this.companiesDB = this.data.companiesDB;
    }, error => {
      console.log(error);
      this.router.navigate( ['errors']);
    });
  }

  ngOnInit() {
  }

  editUser(index){
  }

  deleteUser(index){

  }

  editCompany(index){
  }

  deleteCompany(index){
  }
}
