import { Component, OnInit } from '@angular/core';
import {SesionStatusService} from '../../services/sesion-status.service';
declare  var $: any;

@Component({
  selector: 'app-iunid-company',
  templateUrl: './iunid-company.component.html',
  styleUrls: ['./iunid-company.component.css']
})
export class IunidCompanyComponent implements OnInit {

  constructor(private sesionStatus: SesionStatusService) {
    sesionStatus.checkLogged();
  }

  ngOnInit() {
    $(document).ready(function() {
      $('.collapsible').collapsible();
    });
  }

}
