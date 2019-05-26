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
    option1:[
      {
        name: "Opciones",
        values: [
          {
            name: "Login",
            route: "login"
          },
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
    option2: { name: "false", route: "false" },
    option3: { name: "false", route: "false"  }
    };
  constructor( private router: Router,
               private sesionStatus: SesionStatusService) {
    this.sesionStatus.currenSesionStatus.subscribe(status => {
      console.log(status);
      if(localStorage.getItem('user')){
        if(JSON.parse(localStorage.getItem('user')).userDB && JSON.parse(localStorage.getItem('user')).userDB.userType === 'USER_ROLE'){
          this.sidebarData = {
            option1:[
              {
                name: "Usuario",
                values: [
                  {
                    name: "Perfil",
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
            option2: {
              name: "Ayuda",
              route: "/iUnidUser/help"
            },
            option3: {
              name: "Cerrar Sesión",
              route: ""
            },
          };
        }
        if(JSON.parse(localStorage.getItem('user')).userDB && JSON.parse(localStorage.getItem('user')).userDB.userType === 'ADMIN_ROLE'){
          this.sidebarData = {
            option1:[],
            option2: {
              name: "Admin",
              route: "/iUnidAdmin/admin"
            },
            option3: {
              name: "Cerrar Sesión",
              route: ""
            },
          };
        }
        if(JSON.parse(localStorage.getItem('user')).companyDB){
          this.sidebarData = {
            option1:[
              {
                name: "Empresa",
                values: [
                  {
                    name: "Perfil",
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
            option2: {
              name: "Ayuda",
              route: "/iUnidCompany/help"
            },
            option3: {
              name: "Cerrar Sesión",
              route: ""
            }
          };
        }
      } else {
        this.sidebarData = {
          option1:[
            {
              name: "Opciones",
              values: [
                {
                  name: "Login",
                  route: "login"
                },
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
          option2: { name: "false", route: "false" },
          option3: { name: "false", route: "false"  }
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
}
