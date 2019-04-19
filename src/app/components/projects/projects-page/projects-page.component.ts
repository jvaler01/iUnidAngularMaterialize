import { Component, OnInit } from '@angular/core';
import {ControllerService} from '../../../services/controller.service';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.css']
})
export class ProjectsPageComponent implements OnInit {

  data1: any = [];
  data2: any = [];
  email: string;
  type: string;
  user: any = {};
  data: any = {};
  constructor( private controller: ControllerService ) {
    // this.data = this.data1;
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log("this.user");
    console.log(this.user.token);
    if (this.user.userDB) {
      console.log(this.user.userDB.email);
      this.email = this.user.userDB.email;
      this.type = 'user';

      this.controller.getProjectsThatHeWorks(this.user.token, this.email).subscribe( data => {
        this.data2 = data;
        console.log(this.data2);
      }, error => console.log(error));

    } else if(this.user.companyDB){
      console.log(this.user.companyDB.email);
      this.email = this.user.companyDB.email;
      this.type = 'company';
    }

    this.controller.getProjects(this.user.token, this.email).subscribe( data => {
      this.data1 = data;
      console.log(this.data1);
      this.data = this.data1;
    }, error => console.log(error));
  }

  ngOnInit() {
  }

  load(param: string) {
    if(param === 'client'){
      this.data = null;
      this.data = this.data1
    }
    if(param === 'employer'){
      this.data = null;
      this.data = this.data2
    }
  }
}
