import { Component } from '@angular/core';
declare  var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'iUnidMaterialize';

  public ngOnInit()
  {
    $(document).ready(function() {
      $('.collapsible').collapsible();
    });
    $(document).ready(function() {
      $('.sidenav').sidenav();
    });
  }
}
