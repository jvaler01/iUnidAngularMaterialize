import { Component, OnInit } from '@angular/core';
import {ControllerService} from '../../../services/controller.service';
import {min} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ErrorServiceService} from '../../../services/error-service.service';
declare var $: any;
declare var M: any;

@Component({
  selector: 'app-search-job',
  templateUrl: './search-job.component.html',
  styleUrls: ['./search-job.component.css']
})
export class SearchJobComponent implements OnInit {
  user: any = {};
  data: any = {};
  categ: any;
  tags:any = [];
  options = [
    {
      value: "computer_science",
      label: "Informática"
    },
    {
      value: "physics",
      label: "Física"
    },
    {
      value: "graphic_design",
      label: "Diseño Gráfico"
    },
    {
      value: "design",
      label: "Diseño"
    },
    {
      value: "architecture",
      label: "Arquitectura"
    },
    {
      value: "other",
      label: "Otros"
    }
  ];
  projectId;
  minPrice;
  maxPrice;
  counterOfferValue = 0;
  constructor( private router: Router,
               private messageService: ErrorServiceService,
              private controller: ControllerService ) {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log("this.user");
    console.log(this.user.token);
    console.log(this.user.userDB.email);


  }

  ngOnInit() {
    $(document).ready(function(){
      $('select').formSelect();
    });

    $(document).ready(function() {
      $('.collapsible').collapsible();
    });

    $(document).ready(function(){
      $('.modal').modal();
    });

    $(document).ready(function(){
      $('#counterOfferInput').range();
    });

    $('.chips').chips();

    $(document).ready(function(){
      $('.tooltipped').tooltip();
    });
  }

  takeData(data: any, option:string ){
    this.tags = [];
    var chipData= M.Chips.getInstance($('.chips-initial')).chipsData;
    if( chipData.length !== 0) {
      for (let i = 0; i < chipData.length; i++){
        this.tags.push(chipData[i].tag);
      }
    }
    this.categ = data;
    console.log(data);
    console.log(chipData);
    console.log(this.tags);
    if(option === 'name'){
      this.controller.getProjectsByName(this.user.token, this.user.userDB.email, this.categ).subscribe( data => {
        this.data = data;
        if(this.data.err){
          this.messageService.takeMessage(this.data.err.message);
          this.router.navigate( ['/error']);
        }
        console.log(this.data);
      }, error => {
        console.log(error);
        this.messageService.takeMessage(error.err.message);
        this.router.navigate( ['/error']);
      });
    }
    if(option === 'category'){
      this.controller.getProjectsByCategory(this.user.token, this.user.userDB.email, this.categ).subscribe( data => {
        this.data = data;
        if(this.data.err){
          this.messageService.takeMessage(this.data.err.message);
          this.router.navigate( ['/error']);
        }
        console.log(this.data);
      }, error => {
        console.log(error);
        this.messageService.takeMessage(error.err.message);
        this.router.navigate( ['/error']);
      });
    }
    if(option === 'tag'){
      //this.categ = this.categ.split(',');
      //console.log(this.categ);
      this.controller.getProjectsByTag(this.user.token, this.user.userDB.email, this.tags).subscribe( data => {
        this.data = data;
        if(this.data.err){
          this.messageService.takeMessage(this.data.err.message);
          this.router.navigate( ['/error']);
        }
        console.log(this.data);
      }, error => {
        console.log(error);
        this.messageService.takeMessage(error.err.message);
        this.router.navigate( ['/error']);
      });
    }
  }


  joinProject(projectId: any){
    console.log(projectId);
    this.controller.joinProject(this.user.token, this.user.userDB.email, projectId).subscribe( data => {
      this.data = data;
      if(this.data.err){
        this.messageService.takeMessage(this.data.err.message);
        this.router.navigate( ['/error']);
      }
      console.log(this.data);
    }, error => {
      console.log(error);
      this.messageService.takeMessage(error.err.message);
      this.router.navigate( ['/error']);
    });
  }

  setCounterOfferData(projectId: any, minPrice: any, maxPrice: any){
    this.projectId = projectId;
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
    this.counterOfferValue = 0;
  }

  counterOfferDataInput(counterOffer: any){
    this.counterOfferValue = counterOffer;
  }

  sendCounterOffer(){
    console.log(this.projectId);
    console.log(this.counterOfferValue);
    let email: any;
    if(JSON.parse(localStorage.getItem('user')).userDB){
      email = this.user.userDB.email
    } else {
      email = this.user.companyDB.email
    }
    this.controller.counterOffer(this.user.token, email, this.projectId, this.counterOfferValue).subscribe( data => {
      console.log(data);
      this.data = data;
      if(this.data.err){
        $('#counterOfferModal').modal('close');
        this.messageService.takeMessage(this.data.err.message);
        this.router.navigate( ['/error']);
      }else{
        $('#counterOfferModal').modal('close');
        if(JSON.parse(localStorage.getItem('user')).userDB){
          this.router.navigate( ['userProjects']);
        } else {
          this.router.navigate( ['companyProjects']);
        }
      }
    }, error => {
      console.log(error);
      $('#counterOfferModal').modal('close');
      this.messageService.takeMessage(error.err.message);
      this.router.navigate( ['/error']);
    });
  }
}
