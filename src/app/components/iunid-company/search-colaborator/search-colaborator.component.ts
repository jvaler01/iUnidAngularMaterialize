import { Component, OnInit } from '@angular/core';
import {ControllerService} from '../../../services/controller.service';
declare var $: any;

@Component({
  selector: 'app-search-colaborator',
  templateUrl: './search-colaborator.component.html',
  styleUrls: ['./search-colaborator.component.css']
})
export class SearchColaboratorComponent implements OnInit {

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
  constructor( private controller: ControllerService ) {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log("this.user");
    console.log(this.user.token);
    console.log(this.user.companyDB.email);


  }

  ngOnInit() {
    $(document).ready(function(){
      $('select').formSelect();
    });

    $(document).ready(function() {
      $('.collapsible').collapsible();
    });
  }

  takeData(data: any, option:string ){
    this.categ = data;
    console.log(data);
    if(option === 'name'){
      this.controller.getProjectsbyName(this.user.token, this.user.companyDB.email, this.categ).subscribe( data => {
        this.data = data;
        console.log(this.data);
      }, error => console.log(error));
    }
    if(option === 'category'){
      this.controller.getProjectsbyCategory(this.user.token, this.user.companyDB.email, this.categ).subscribe( data => {
        this.data = data;
        console.log(this.data);
      }, error => console.log(error));
    }
    if(option === 'tag'){
      //this.categ = this.categ.split(',');
      //console.log(this.categ);
      this.controller.getProjectsbytag(this.user.token, this.user.companyDB.email, this.tags).subscribe( data => {
        this.data = data;
        console.log(this.data);
      }, error => console.log(error));
    }
  }

  pushTag(data:any){
    // @ts-ignore
    document.getElementById('byTag').value = "";
    if(data !== ''){
      this.tags.push(data);
    }
  }

  deleteTag(index:any){
    this.tags.splice(index, 1);
  }

  joinProject(projectId: any){
    console.log(projectId);
    this.controller.joinProject(this.user.token, this.user.companyDB.email, projectId).subscribe( data => {
      this.data = data;
      console.log(this.data);
    }, error => console.log(error));
  }

}
