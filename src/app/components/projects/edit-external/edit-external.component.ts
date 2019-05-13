import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ControllerService} from '../../../services/controller.service';
import {ErrorServiceService} from '../../../services/error-service.service';

@Component({
  selector: 'app-edit-external',
  templateUrl: './edit-external.component.html',
  styleUrls: ['./edit-external.component.css']
})
export class EditExternalComponent implements OnInit, OnDestroy {
  form: FormGroup;
  user: any = {};
  data: any = {};
  project: any = {};
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
    this.project.url = this.data.url;
    this.form = new FormGroup({
      name: new FormControl(this.project.name, Validators.required),
      desc: new FormControl(this.project.desc, Validators.minLength(50)),
      url: new FormControl(this.project.url)
    });
  }

  ngOnInit() {
  }

  sendData() {
    console.log(this.form);
    let externalProjectData:any = {};
    if(JSON.parse(localStorage.getItem('user')).userDB){
      externalProjectData.email = this.user.userDB.email;
    }else{
      externalProjectData.email = this.user.companyDB.email;
    }
    //externalProjectData.email = this.user.userDB.email;
    externalProjectData.name = this.form.get('name').value;
    externalProjectData.description = this.form.get('desc').value;
    externalProjectData.url = this.form.get('url').value;
    externalProjectData.id = this.project.id;
    console.log(externalProjectData);
    this.controller.editExternalProject(this.user.token, externalProjectData).subscribe( data => {
      // localStorage.setItem('user', JSON.stringify(data));
      // this.router.navigate( ['/iUnidCompany']);
      this.data = data;
      if(this.data.err){
        this.messageService.takeMessage(this.data.err.message);
        this.router.navigate( ['/error']);
      }else {
        if (JSON.parse(localStorage.getItem('user')).userDB) {
          this.router.navigate(['/iUnidUser/userProfile']);
        } else {
          this.router.navigate(['/iUnidCompany/companyProfile']);
        }
      }
    }, error => {
      console.log(error);
      this.messageService.takeMessage(error.err.message);
      this.router.navigate( ['/error']);
    });
    console.log(this.form.value);
  }

  ngOnDestroy(): void {
    localStorage.removeItem('dataProject');
  }
}
