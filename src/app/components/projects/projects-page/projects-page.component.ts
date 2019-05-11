import { Component, OnInit } from '@angular/core';
import {ControllerService} from '../../../services/controller.service';
import {Router} from '@angular/router';
declare var $: any;

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
  projectId;
  minPrice;
  maxPrice;
  payValue = 0;
  userOffer = 0;
  evaluateValue = 0;
  userEmail: "";
  constructor( private router: Router,
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
    $(document).ready(function() {
      $('.collapsible').collapsible();
    });
    $(document).ready(function(){
      $('ul.tabs').tabs({
        swipeable : true,
        responsiveThreshold : 1920
      });
    });
    $(document).ready(function(){
      $('.modal').modal();
    });

    $(document).ready(function(){
      $('#payDataInput').range();
    });

    $(document).ready(function(){
      $('#evaluateDataInput').range();
    });
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

  editInt(project:any){
    console.log(project);
    localStorage.setItem('dataProject', JSON.stringify(project));
    if(JSON.parse(localStorage.getItem('user')).userDB){
      this.router.navigate( ['/iUnidUser/editInt']);
    } else {
      this.router.navigate( ['/iUnidCompany/editInt']);
    }
  }

  setProjectId(projectId: any){
    this.projectId = projectId;
  }

  deleteProject(projectId: any){
    console.log(projectId);
    let email: any;
    if(JSON.parse(localStorage.getItem('user')).userDB){
      email = this.user.userDB.email
    } else {
      email = this.user.companyDB.email
    }
    this.controller.deleteInternalProject(this.user.token, projectId, email).subscribe( data => {
      console.log(data);

      this.refreshData();
      $('#deleteModal').modal('close');
      if(JSON.parse(localStorage.getItem('user')).userDB){
        this.router.navigate( ['/iUnidUser/userProjects']);
      } else {
        this.router.navigate( ['/iUnidCompany/companyProjects']);
      }
    }, error => {
      console.log(error);
      this.router.navigate( ['errors']);
    });
  }

  acceptPending(projectId: any, userEmail: any){
    let email: any;
    if(JSON.parse(localStorage.getItem('user')).userDB){
      email = this.user.userDB.email
    } else {
      email = this.user.companyDB.email
    }
    this.controller.acceptPendingRequest(this.user.token, email, projectId, userEmail).subscribe( data => {
      console.log(data);

      this.refreshData();

      if(JSON.parse(localStorage.getItem('user')).userDB){
        this.router.navigate( ['/iUnidUser/userProjects']);
      } else {
        this.router.navigate( ['/iUnidCompany/companyProjects']);
      }
    }, error => {
      console.log(error);
      this.router.navigate( ['errors']);
    });
  }

  denyPending(projectId: any, userEmail: any){
    let email: any;
    if(JSON.parse(localStorage.getItem('user')).userDB){
      email = this.user.userDB.email
    } else {
      email = this.user.companyDB.email
    }
    this.controller.denyPendingRequest(this.user.token, email, projectId, userEmail).subscribe( data => {
      console.log(data);

      this.refreshData();

      if(JSON.parse(localStorage.getItem('user')).userDB){
        this.router.navigate( ['/iUnidUser/userProjects']);
      } else {
        this.router.navigate( ['/iUnidCompany/companyProjects']);
      }
    }, error => {
      console.log(error);
      this.router.navigate( ['errors']);
    });
  }

  closeProject(projectId: any, index: any){
    let email: any;
    let canClose = true;
    if(JSON.parse(localStorage.getItem('user')).userDB){
      email = this.user.userDB.email
    } else {
      email = this.user.companyDB.email
    }
    for(let i = 0; i < this.data.internalProjects[index].users.length; i++){
      console.log(this.data.internalProjects[index].users[i]);
      if(this.data.internalProjects[index].users[i].userPay === false){
        canClose = false;
        break;
      }
    }

    if(!canClose){
      alert("No has pagado a todos tus empleados");
    }else{
      this.controller.closeProject(this.user.token, email, projectId).subscribe( data => {
        console.log(data);

        this.refreshData();

        if(JSON.parse(localStorage.getItem('user')).userDB){
          this.router.navigate( ['/iUnidUser/userProjects']);
        } else {
          this.router.navigate( ['/iUnidCompany/companyProjects']);
        }
      }, error => {
        console.log(error);
        this.router.navigate( ['errors']);
      });
    }
  }

  acceptCounterOffer(projectId: any, userEmail: any, price: any){
    console.log(projectId);
    console.log(userEmail);
    console.log(price);
    let email: any;
    if(JSON.parse(localStorage.getItem('user')).userDB){
      email = this.user.userDB.email
    } else {
      email = this.user.companyDB.email
    }
    this.controller.acceptCounterOffer(this.user.token, email, projectId, price, userEmail ).subscribe( data => {
      console.log(data);

      this.refreshData();

      if(JSON.parse(localStorage.getItem('user')).userDB){
        this.router.navigate( ['/iUnidUser/userProjects']);
      } else {
        this.router.navigate( ['/iUnidCompany/companyProjects']);
      }
    }, error => {
      console.log(error);
      this.router.navigate( ['errors']);
    });
  }

  denyCounterOffer(projectId: any, userEmail: any, price: any){
    let email: any;
    if(JSON.parse(localStorage.getItem('user')).userDB){
      email = this.user.userDB.email
    } else {
      email = this.user.companyDB.email
    }
    this.controller.denyCounterOffer(this.user.token, email, projectId, userEmail, price).subscribe( data => {
      console.log(data);

      this.refreshData();

      if(JSON.parse(localStorage.getItem('user')).userDB){
        this.router.navigate( ['/iUnidUser/userProjects']);
      } else {
        this.router.navigate( ['/iUnidCompany/companyProjects']);
      }
    }, error => {
      console.log(error);
      this.router.navigate( ['errors']);
    });
  }

  kickPerson(projectId: any, userEmail: any) {
    let email: any;
    if(JSON.parse(localStorage.getItem('user')).userDB){
      email = this.user.userDB.email
    } else {
      email = this.user.companyDB.email
    }
    this.controller.kickPerson(this.user.token, email, projectId, userEmail).subscribe( data => {
      console.log(data);

      this.refreshData();

      if(JSON.parse(localStorage.getItem('user')).userDB){
        this.router.navigate( ['/iUnidUser/userProjects']);
      } else {
        this.router.navigate( ['/iUnidCompany/companyProjects']);
      }
    }, error => {
      console.log(error);
      this.router.navigate( ['errors']);
    });
  }

  refreshData(){
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

  setPayData(projectId: any, minPrice: any, maxPrice: any, userOffer: any, userEmail: any){
    this.projectId = projectId;
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
    this.payValue = 0;
    this.userOffer = userOffer;
    this.userEmail = userEmail;
    console.log(this.userOffer);
    console.log(userOffer);
    if(userOffer !== 0){
      this.payValue = this.userOffer;
    }
    console.log(this.payValue);
  }

  payDataInput(pay: any){
    this.payValue = pay;
  }

  sendPay(){
    console.log(this.projectId);
    console.log(this.payValue);
    let email: any;
    if(JSON.parse(localStorage.getItem('user')).userDB){
      email = this.user.userDB.email
    } else {
      email = this.user.companyDB.email
    }
    console.log(this.userEmail)
    // @ts-ignore
    this.controller.payUser(this.user.token, this.payValue, this.userEmail, this.projectId).subscribe( data => {
      console.log(data);
      let datahref = data;
      // @ts-ignore
      window.open(datahref.data)
    }, error => {
      console.log(error);
    });
  }

  setEvaluateUser(projectId: any, userEmail: any){
    this.projectId = projectId;
    this.userEmail = userEmail;
  }

  sendEvaluate(){
    let email: any;
    if(JSON.parse(localStorage.getItem('user')).userDB){
      email = this.user.userDB.email
    } else {
      email = this.user.companyDB.email
    }
    // @ts-ignore
    this.controller.evaluateUser(this.user.token, email, this.projectId, this.userEmail.userEmail, this.evaluateValue ).subscribe( data => {
      console.log(data);

    }, error => {
      console.log(error);
    });
  }

  evaluateInput(evaluateData: any){
    this.evaluateValue = evaluateData;
  }
}
