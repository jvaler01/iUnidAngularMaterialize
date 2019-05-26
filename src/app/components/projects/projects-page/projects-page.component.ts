import { Component, OnInit } from '@angular/core';
import {ControllerService} from '../../../services/controller.service';
import {Router} from '@angular/router';
import {ErrorServiceService} from '../../../services/error-service.service';
import { saveAs } from "file-saver";
declare var $: any;

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.css']
})
export class ProjectsPageComponent implements OnInit {

  projects: any = [];
  projectsThatHeWorks: any = [];
  client = true;
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
               private messageService: ErrorServiceService,
               private controller: ControllerService ) {
    // this.data = this.data1;
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user.userDB) {
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
      this.email = this.user.companyDB.email;
      this.type = 'company';
    }

    this.controller.getProjects(this.user.token, this.email).subscribe( data => {
      this.data = data;
      this.projects = data;
      console.log(this.projects);
      if(this.projects.err){
        this.messageService.takeMessage(this.projects.err.message);
        this.router.navigate( ['/error']);
      }
      //this.data = this.projects;
    }, error => {
      this.messageService.takeMessage(error.err.message);
      this.router.navigate( ['/error']);
    });
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
    if(param === 'employer'){
      this.data = null;
      this.data = this.projects;
      this.client = true;
    }
    if(param === 'worker'){
      this.data = null;
      this.data = this.projectsThatHeWorks;
      this.client = false;
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
      this.data = data;
      if(this.data.err){
        this.messageService.takeMessage(this.data.err.message);
        this.router.navigate( ['/error']);
      }else {
        this.refreshData();
        $('#deleteModal').modal('close');
      }
    }, error => {
      console.log(error);
      this.messageService.takeMessage(error.err.message);
      this.router.navigate( ['/error']);
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
      this.data = data;
      if(this.data.err){
        this.messageService.takeMessage(this.data.err.message);
        this.router.navigate( ['/error']);
      }else {
        this.refreshData();
      }
    }, error => {
      console.log(error);
      this.messageService.takeMessage(error.err.message);
      this.router.navigate( ['/error']);
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
      this.data = data;
      if(this.data.err){
        this.messageService.takeMessage(this.data.err.message);
        this.router.navigate( ['/error']);
      }else {
        this.refreshData();
      }
    }, error => {
      console.log(error);
      this.messageService.takeMessage(error.err.message);
      this.router.navigate( ['/error']);
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
    for(let i = 0; i < this.projects.internalProjects[index].users.length; i++){
      console.log(this.projects.internalProjects[index].users[i]);
      if(this.projects.internalProjects[index].users[i].userPay === false){
        canClose = false;
        break;
      }
    }

    if(!canClose){
      alert("No has pagado a todos tus empleados");
    }else{
      this.controller.closeProject(this.user.token, email, projectId).subscribe( data => {
        console.log(data);
        this.data = data;
        if(this.data.err){
          this.messageService.takeMessage(this.data.err.message);
          this.router.navigate( ['/error']);
        }else {
          this.refreshData();
        }
      }, error => {
        console.log(error);
        this.messageService.takeMessage(error.err.message);
        this.router.navigate( ['/error']);
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
      this.data = data;
      if(this.data.err){
        this.messageService.takeMessage(this.data.err.message);
        this.router.navigate( ['/error']);
      }else {
        this.refreshData();
      }
    }, error => {
      console.log(error);
      this.messageService.takeMessage(error.err.message);
      this.router.navigate( ['/error']);
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
      this.data = data;
      if(this.data.err){
        this.messageService.takeMessage(this.data.err.message);
        this.router.navigate( ['/error']);
      }else {
        this.refreshData();

      }
    }, error => {
      console.log(error);
      this.messageService.takeMessage(error.err.message);
      this.router.navigate( ['/error']);
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
      this.data = data;
      if(this.data.err){
        this.messageService.takeMessage(this.data.err.message);
        this.router.navigate( ['/error']);
      }else {
        this.refreshData();

      }
    }, error => {
      console.log(error);
      this.messageService.takeMessage(error.err.message);
      this.router.navigate( ['/error']);
    });
  }

  refreshData(){
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
        console.log(error);
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
      this.data = data;
      if(this.projects.err){
        this.messageService.takeMessage(this.projects.err.message);
        this.router.navigate( ['/error']);
      }
      console.log(this.projects);
      //this.data = this.projects;
    }, error => {
      console.log(error);
      this.messageService.takeMessage(error.err.message);
      this.router.navigate( ['/error']);
    });
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
    console.log(this.userEmail);
    // @ts-ignore
    this.controller.payUser(this.user.token, this.payValue, this.userEmail, this.projectId).subscribe( data => {
      console.log(data);
      this.data = data;
      if(this.data.err){
        this.messageService.takeMessage(this.data.err.message);
        this.router.navigate( ['/error']);
      }else{
        let datahref = data;
        // @ts-ignore
        window.open(datahref.data)
      }
    }, error => {
      console.log(error);
      this.messageService.takeMessage(error.err.message);
      this.router.navigate( ['/error']);
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
      this.data = data;
      if(this.data.err){
        this.messageService.takeMessage(this.data.err.message);
        this.router.navigate( ['/error']);
      }else {
        $('#evaluateModal').modal('close');
        this.refreshData();
      }
    }, error => {
      console.log(error);
      this.messageService.takeMessage(error.err.message);
      this.router.navigate( ['/error']);
    });
  }

  evaluateInput(evaluateData: any){
    this.evaluateValue = evaluateData;
  }

  download(file: string) {
    console.log("RECIBO: " + file);
    let filename = file;
    this.controller.downloadFile(filename).subscribe(
      data => {
        saveAs(data, filename);
      },
      err => {
        alert("Problem while downloading the file.");
        console.error(err);
      }
    );
  }
}
