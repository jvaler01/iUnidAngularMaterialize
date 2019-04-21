import { Component, OnInit } from '@angular/core';
import {SesionStatusService} from '../../services/sesion-status.service';
declare  var $: any;

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  logged = false;
  type = '';
  constructor(private secionStatus: SesionStatusService) {
    this.secionStatus.currenSesionStatus.subscribe(status => {
      console.log(status);
      this.logged = status});
    this.secionStatus.currentType.subscribe(type => {
      console.log(type);
      this.type = type});
  }
  ngOnInit() {
    $(document).ready(function(){
      $('.collapsible').collapsible();
    });
  }

}
