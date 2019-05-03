import { Component, OnInit } from '@angular/core';
import {SesionStatusService} from '../../services/sesion-status.service';
declare  var $: any;

@Component({
  selector: 'app-iunid-admin',
  templateUrl: './iunid-admin.component.html',
  styleUrls: ['./iunid-admin.component.css']
})
export class IunidAdminComponent implements OnInit {

  constructor(private sesionStatus: SesionStatusService) {
    sesionStatus.checkLogged();
  }

  ngOnInit() {
    $(document).ready(function() {
      $('.collapsible').collapsible();
    });
  }
}
