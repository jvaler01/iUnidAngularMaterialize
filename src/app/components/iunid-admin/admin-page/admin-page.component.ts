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
    localStorage.setItem('dataUser', JSON.stringify(this.usersDB[index]));
    this.router.navigate( ['/iUnidAdmin/editUser']);
  }

  deleteUser(index){
    console.log(this.usersDB[index]);
    this.controller.deleteUserOrCompanyAdmin(this.user.token, this.user.userDB.email, this.usersDB[index].email, this.user.userDB.userType).subscribe( data => {
      console.log(data);
      this.router.navigate(['**']);
    }, error => {
      console.log(error);
      this.router.navigate( ['errors']);
    });
  }

  editCompany(index){
    localStorage.setItem('dataCompany', JSON.stringify(this.companiesDB[index]));
    this.router.navigate( ['/iUnidAdmin/editCompany']);
  }

  deleteCompany(index){
    this.controller.deleteUserOrCompanyAdmin(this.user.token, this.user.userDB.email, this.companiesDB[index].email, this.user.userDB.userType).subscribe( data => {
      console.log(data);
      this.router.navigate(['**']);
    }, error => {
      console.log(error);
      this.router.navigate( ['errors']);
    });
  }
}
