import { Component, OnInit } from '@angular/core';
import {SesionStatusService} from '../../services/sesion-status.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
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
  }

}
