import { Component, OnInit } from '@angular/core';
import {ControllerService} from '../../../services/controller.service';
import {Router} from '@angular/router';
import {ErrorServiceService} from '../../../services/error-service.service';

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
              private messageService: ErrorServiceService,
              private router: Router,) {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log("this.user");
    console.log(this.user.token);
    console.log(this.user.userDB.email);

    this.controller.getUsers(this.user.token, this.user.userDB.email, this.user.userDB.userType).subscribe( data => {
      this.data = data;
      if(this.data.err){
        this.messageService.takeMessage(this.data.err.message);
        this.router.navigate( ['/error']);
      }else{
        this.usersDB = this.data.usersDB;
        this.companiesDB = this.data.companiesDB;
      }
    }, error => {
      console.log(error);
      this.messageService.takeMessage(error.err.message);
      this.router.navigate( ['/error']);
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
      this.data = data;
      if(this.data.err){
        this.messageService.takeMessage(this.data.err.message);
        this.router.navigate( ['/error']);
      }else {
        this.router.navigate(['**']);
      }
    }, error => {
      console.log(error);
      this.messageService.takeMessage(error.err.message);
      this.router.navigate( ['/errors']);
    });
  }

  editCompany(index){
    localStorage.setItem('dataCompany', JSON.stringify(this.companiesDB[index]));
    this.router.navigate( ['/iUnidAdmin/editCompany']);
  }

  deleteCompany(index){
    this.controller.deleteUserOrCompanyAdmin(this.user.token, this.user.userDB.email, this.companiesDB[index].email, this.user.userDB.userType).subscribe( data => {
      console.log(data);
      this.data = data;
      if(this.data.err){
        this.messageService.takeMessage(this.data.err.message);
        this.router.navigate( ['/error']);
      }else {
        this.router.navigate(['**']);
      }
    }, error => {
      console.log(error);
      this.messageService.takeMessage(error.err.message);
      this.router.navigate( ['/errors']);
    });
  }
}
