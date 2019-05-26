import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ControllerService} from '../../../services/controller.service';
import {ErrorServiceService} from '../../../services/error-service.service';
declare var $: any;
declare var M: any;

@Component({
  selector: 'app-edit-internal',
  templateUrl: './edit-internal.component.html',
  styleUrls: ['./edit-internal.component.css']
})
export class EditInternalComponent implements OnInit, OnDestroy {
  form: FormGroup;
  user: any = {};
  tags: any = [];
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

  data: any = {};
  project: any = {};
  fileUpload: File = null;
  constructor(private router: Router,
              private messageService: ErrorServiceService,
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
    this.project.counterOffer = this.data.counterOffer;
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
    $('.chips').chips();

    $(document).ready(function(){
      $('.tooltipped').tooltip();
    });
    let dataTags = [];
    for (let i = 0; i < this.project.tags.length; i++) {
      dataTags.push({tag: this.project.tags[i]})
    }
    if(this.project.tags.length != 0){
      this.valid = true;
    }
    $('.chips-initial').chips({
      data: dataTags,
    });
  }

  selectionFile( file: File ) {
    if (!file) {
      this.fileUpload = null;
      return;
    }

    this.fileUpload = file;
    console.log(this.fileUpload)
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
    internalProjectData.id = this.project.id;
    console.log(internalProjectData);
    this.controller.editInternalProject(this.user.token, internalProjectData).subscribe( data => {
      // localStorage.setItem('user', JSON.stringify(data));
      // this.router.navigate( ['/iUnidCompany']);
      this.data = data;
      if(this.data.err){
        this.messageService.takeMessage(this.data.err.message);
        this.router.navigate( ['/error']);
      }else {
        console.log(data);
        if(this.fileUpload !== null) {
          this.saveFile(this.data.project._id);
        }
        if (JSON.parse(localStorage.getItem('user')).userDB) {
          this.router.navigate(['/iUnidUser/userProjects']);
        } else {
          this.router.navigate(['/iUnidCompany/companyProjects']);
        }
      }
    }, error => {
      console.log(error);
      this.messageService.takeMessage(error.err.message);
      this.router.navigate( ['/error']);
    });
    console.log(this.form.value);
  }

  saveFile(id: any){
    this.controller.saveFileProject(this.fileUpload, id).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  ngOnDestroy(): void {
    localStorage.removeItem('dataProject');
  }
}
