import { Component, OnInit } from '@angular/core';
import {ErrorServiceService} from '../../services/error-service.service';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent implements OnInit {
  message: any;
  constructor( private messageService: ErrorServiceService) {
    this.messageService.currentMessage.subscribe(message => {
      console.log(message);
      this.message = message});
    if(this.message === ''){
      this.message = 'No hay nada que mostrar :)'
    }
  }

  ngOnInit() {
  }

}
