import { Component, OnInit } from '@angular/core';
import {SesionStatusService} from '../../services/sesion-status.service';
declare  var $: any;

@Component({
  selector: 'app-iunid-user',
  templateUrl: './iunid-user.component.html',
  styleUrls: ['./iunid-user.component.css']
})
export class IunidUserComponent implements OnInit {


  constructor(private sesionStatus: SesionStatusService) {
    sesionStatus.checkLogged();
  }

  ngOnInit() {
    $(document).ready(function() {
      $('.collapsible').collapsible();
    });
  }

}
