import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ControllerService} from '../../../services/controller.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
declare var $: any;
declare var M: any;
@Component({
  selector: 'app-register-internal',
  templateUrl: './register-internal.component.html',
  styleUrls: ['./register-internal.component.css']
})
export class RegisterInternalComponent implements OnInit {
  form: FormGroup;
  user: any = {};
  tags:any = [];
  valid = false;
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
  constructor(private router: Router,
              private controller: ControllerService) {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log("this.user");
    console.log(this.user.token);
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      desc: new FormControl('', [Validators.required, Validators.minLength(50)]),
      tags: new FormControl(''),
      maxPrice: new FormControl('', Validators.required),
      minPrice: new FormControl('', Validators.required),
      deliveryDate: new FormControl(''),
      counteroffer: new FormControl(false),
      category: new FormControl('0', Validators.pattern('[^0]+')),
    });
    console.log(this.form)
  }

  ngOnInit() {
    $(document).ready(function(){
      $('select').formSelect();
    });
    $(document).ready(function(){
      $('.datepicker').datepicker({
        firstDay: true,
        format: 'dd/mm/yyyy',
        i18n: {
          cancel: 'Cancelar',
          months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
          monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"],
          weekdays: ["Domingo","Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
          weekdaysShort: ["Dom","Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
          weekdaysAbbrev: ["D","L", "M", "M", "J", "V", "S"]
        }
      });
    });

    $('.chips').chips();

    $(document).ready(function(){
      $('.tooltipped').tooltip();
    });
  }

  checkTags(){
    console.log("in");
    var chipData= M.Chips.getInstance($('.chips-initial')).chipsData;
    if( chipData.length !== 0) {
      this.valid = true;
    }else{
      this.valid = false;
    }
  }

  sendData() {
    console.log(this.form);

    let dateValue = $('.datepicker').val();
    let date: Date = $('.datepicker').val().split("/");
    if(dateValue === ''){
      var d = new Date();
      d.setMonth(d.getMonth() + 1);
      console.log(d);
    }else{
      var d = new Date(date[2], date[1] - 1, date[0]);
    }

    let internalProjectData:any = {};
    if(JSON.parse(localStorage.getItem('user')).userDB){
      internalProjectData.email = this.user.userDB.email;
    }else{

      internalProjectData.email = this.user.companyDB.email;
    }
    this.tags = [];
    var chipData= M.Chips.getInstance($('.chips-initial')).chipsData;
    if( chipData.length !== 0) {
      for (let i = 0; i < chipData.length; i++){
        this.tags.push(chipData[i].tag);
      }
    }
    //internalProjectData.email = this.user.userDB.email;
    internalProjectData.name = this.form.get('name').value;
    internalProjectData.description = this.form.get('desc').value;
    //internalProjectData.tags = this.form.get('tags').value;

    internalProjectData.tags = this.tags;
    internalProjectData.maxPrice = this.form.get('maxPrice').value;
    internalProjectData.minPrice = this.form.get('minPrice').value;
    internalProjectData.deliveryDate = d;
    internalProjectData.counterOffer = this.form.get('counteroffer').value;
    internalProjectData.category = this.form.get('category').value;
    internalProjectData.initialDate = new Date();
    internalProjectData.files = ':(';
    console.log(internalProjectData);
    this.controller.createInternalProject(this.user.token, internalProjectData).subscribe( data => {
      // localStorage.setItem('user', JSON.stringify(data));
      // this.router.navigate( ['/iUnidCompany']);
      if(JSON.parse(localStorage.getItem('user')).userDB){
        this.router.navigate( ['/iUnidUser/userProfile']);
      }else{
        this.router.navigate( ['/iUnidCompany/companyProfile']);
      }
    }, error => console.log(error));
    console.log(this.form.value);
  }
}
