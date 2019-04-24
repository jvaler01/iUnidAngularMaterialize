import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {SesionStatusService} from '../../services/sesion-status.service';
declare  var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  sidebarData = {
    option: {
      name: "Login",
      route: "login"
    },
    option2:[
      {
        name: "Registro",
        values: [
          {
            name: "Usuario",
            route: "regUser"
          }
          ,
          {
            name: "Empresa",
            route: "regCompany"
          }
        ]
      }
    ],
    option3: { name: "false", route: "false" },
    option4: { name: "false", route: "false"  }
    };
  constructor( private router: Router,
               private sesionStatus: SesionStatusService) {
    this.sesionStatus.currenSesionStatus.subscribe(status => {
      console.log(status);
      if(localStorage.getItem('user')){
        if(JSON.parse(localStorage.getItem('user')).userDB){
          this.sidebarData = {
            option: {
              name: "Home",
              route: "/iUnidUser/home"
            },
            option2:[
              {
                name: "User",
                values: [
                  {
                    name: "Profile",
                    route: "/iUnidUser/userProfile"
                  }
                  ,
                  {
                    name: "Mis Proyectos",
                    route: "/iUnidUser/userProjects"
                  }
                ]
              },
              {
                name: "Trabajo",
                values: [
                  {
                    name: "Buscar Trabajo",
                    route: "/iUnidUser/searchJob"
                  }
                  ,
                  {
                    name: "Publicar Proyecto",
                    route: "/iUnidUser/uploadInt"
                  }
                  ,
                  {
                    name: "Salas de Trabajo",
                    route: "/iUnidUser/lobby"
                  }
                ]
              }
            ],
            option3: {
              name: "Ayuda",
              route: "/iUnidUser/help"
            },
            option4: {
              name: "Logout",
              route: ""
            },
          };
        } if(JSON.parse(localStorage.getItem('user')).companyDB){
        this.sidebarData = {
          option: {
            name: "Home",
            route: "/iUnidCompany/home"
          },
          option2:[
            {
              name: "User",
              values: [
                {
                  name: "Profile",
                  route: "/iUnidCompany/companyProfile"
                }
                ,
                {
                  name: "Mis Proyectos",
                  route: "/iUnidCompany/companyProjects"
                }
              ]
            },
            {
              name: "Trabajo",
              values: [
                {
                  name: "Buscar Colaboradores",
                  route: "/iUnidCompany/searchColaborators"
                }
                ,
                {
                  name: "Publicar Proyecto",
                  route: "/iUnidCompany/uploadInt"
                }
                ,
                {
                  name: "Salas de Trabajo",
                  route: "/iUnidCompany/lobby"
                }
              ]
            }
          ],
          option3: {
            name: "Ayuda",
            route: "/iUnidCompany/help"
          },
          option4: {
            name: "Logout",
            route: ""
          },
        };
      }
    } else {
        this.sidebarData = {
          option: {
            name: "Login",
            route: "login"
          },
          option2:[
            {
              name: "Registro",
              values: [
                {
                  name: "Usuario",
                  route: "regUser"
                }
                ,
                {
                  name: "Empresa",
                  route: "regCompany"
                }
              ]
            }
          ],
          option3: { name: "false", route: "false" },
          option4: { name: "false", route: "false"  }
        };
      }
    });
  }

  ngOnInit() {
    $(document).ready(function() {
      $('.collapsible').collapsible();
    });
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  admin() {
    /*let role: any;
    role = JSON.parse(localStorage.getItem('user')).usuario.role;
    if(role === 'ADMIN_ROLE') {
      return true;
    } else{
      return false;
    }*/

    return false;
  }
}
