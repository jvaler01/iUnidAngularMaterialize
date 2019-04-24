import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ControllerService} from '../../../services/controller.service';
declare var $: any;

@Component({
  selector: 'app-edit-internal',
  templateUrl: './edit-internal.component.html',
  styleUrls: ['./edit-internal.component.css']
})
export class EditInternalComponent implements OnInit, OnDestroy {
  form: FormGroup;
  user: any = {};
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

  data: any = {};
  project: any = {};
  constructor(private router: Router,
              private controller: ControllerService) {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log("this.user");
    console.log(this.user.token);
    this.data = JSON.parse(localStorage.getItem('dataProject'));
    console.log(this.data);
    this.project.id = this.data._id;
    this.project.name = this.data.name;
    this.project.desc = this.data.description;
    this.project.tags = this.data.tags;
    this.project.maxPrice = this.data.maxPrice;
    this.project.minPrice = this.data.minPrice;
    this.project.deliveryDate = this.data.deliveryDate;
    this.project.counteroffer = this.data.counteroffer;
    this.project.category = this.data.category;
    this.form = new FormGroup({
      name: new FormControl(this.project.name, Validators.required),
      desc: new FormControl(this.project.desc, [Validators.required, Validators.minLength(50)]),
      tags: new FormControl(this.project.tags, Validators.required),
      maxPrice: new FormControl(this.project.maxPrice, Validators.required),
      minPrice: new FormControl(this.project.minPrice, Validators.required),
      deliveryDate: new FormControl(''),
      counteroffer: new FormControl(this.project.counteroffer),
      category: new FormControl(this.project.category, Validators.pattern('[^0]+')),
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
    //internalProjectData.email = this.user.userDB.email;
    internalProjectData.name = this.form.get('name').value;
    internalProjectData.description = this.form.get('desc').value;
    internalProjectData.tags = this.form.get('tags').value;
    internalProjectData.maxPrice = this.form.get('maxPrice').value;
    internalProjectData.minPrice = this.form.get('minPrice').value;
    internalProjectData.deliveryDate = d;
    internalProjectData.counterOffer = this.form.get('counteroffer').value;
    internalProjectData.category = this.form.get('category').value;
    internalProjectData.initialDate = new Date();
    internalProjectData.files = ':(';
    internalProjectData.id = this.project.id;
    console.log(internalProjectData);
    this.controller.editInternalProject(this.user.token, internalProjectData).subscribe( data => {
      // localStorage.setItem('user', JSON.stringify(data));
      // this.router.navigate( ['/iUnidCompany']);
      console.log(data);
      if(JSON.parse(localStorage.getItem('user')).userDB){
        this.router.navigate( ['/iUnidUser/userProfile']);
      }else{
        this.router.navigate( ['/iUnidCompany/companyProfile']);
      }
    }, error => console.log(error));
    console.log(this.form.value);
  }

  ngOnDestroy(): void {
    localStorage.removeItem('dataProject');
  }
}
