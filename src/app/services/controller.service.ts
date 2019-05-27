import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {User} from '../models/user';
import {map} from 'rxjs/operators';
import {Company} from '../models/Company';

@Injectable({
  providedIn: 'root'
})

/**
 * Servicio que se encarga de conectar con el servidor para realizar todas las peticiones que se requieran
 */
export class ControllerService {
  apiUrl = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  /**
   * Método login que recibe como parametro un modelo de usuario y lo manda al servidor por la URL /login.
   * El objetivo es comprobar que los datos que ha introducido el usuario son validos para poder hacer la sesión.
   * Si el return devuelve OK se crea la sesión
   * @param user
   */
  login( user: User ) {
    let body = JSON.stringify(user);
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    let url = `${this.apiUrl}login`;
    return this.http.post(url, body, {headers}).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

  /**
   * Método para registrar usuarios que recibe como parámetro un modelo de usuario y lo manda al servidor por la ruta /registerUser.
   * El objetivo es enviar el usuario que se desea crear y guardarlo en base de datos.
   * Si el return devuelve OK se habrá creado el usuario y ya se podra hacer login.
   * @param user
   */
  registerUser( user: User ) {
    let body = JSON.stringify(user);
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    let url = `${this.apiUrl}registerUser`;
    return this.http.post(url, body, {headers}).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

  /**
   * Método para borrar un usuario o compañia, los parámetros son el email del usuario/compañia que se desea borrar y el token de sesión.
   * Se manda al servidor por la ruta /deleteAccount.
   * Si el return devuelve OK se habrá deshabilitado la cuenta
   * @param token token de la sesión para hacer comprobaciones de seguridad en el servidor. Se envía por los headers.
   * @param email email del usuario/compañia
   */
  deleteUserOrCompany( token: any, email: any ){
    let data = {
      email: email
    };
    let body = JSON.stringify(data);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'token': token
    });
    let url = `${this.apiUrl}deleteAccount`;
    return this.http.post(url, body, {headers}).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

  /**
   * Método para registrar compañias que recibe como parámetro un modelo de compañia y lo manda al servidor por la ruta /registerCompany.
   * El objetivo es enviar la compañia que se desea crear y guardarlo en base de datos.
   * Si el return devuelve OK se habrá creado el usuario y ya se podra hacer login.
   * @param company
   */
  registerCompany( company: Company ) {
    let body = JSON.stringify(company);
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    let url = `${this.apiUrl}registerCompany`;
    return this.http.post(url, body, {headers}).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

  /**
   * Método para crear pryectos externos a la aplicación, recibe como parámetros el token se sesión y un modelo de proyecto externo.
   * Se manda al servidor por la ruta /createExternalProject.
   * Si el return devuelve OK el proyecto se habrá creado en la base de datos y ya sera visible para el usuario/compañia.
   * @param token
   * @param data
   */
  createExternalProject( token: any, data:any ) {
    let body = JSON.stringify(data);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'token': token
    });
    let url = `${this.apiUrl}createExternalProject`;
    return this.http.post(url, body, {headers}).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

  /**
   * Método para editar proyectos externos a la aplicación, recibe como parámetros el token de sesión y un modelo de proyecto externo.
   * Se manda al servidor por la ruta /editExternalProject.
   * Si el return devuelve OK el proyecto se habrá editado correctamente.
   * @param token
   * @param data
   */
  editExternalProject( token: any, data:any ) {
    let body = JSON.stringify(data);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'token': token
    });
    let url = `${this.apiUrl}editExternalProject`;
    return this.http.put(url, body, {headers}).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

  /**
   * Método para editar un proyecto interno de la aplicación, recibe como parámetros el token de sesión y un modelo de proyecto interno.
   * Se manda al servidor por la ruta /editInernalProyect
   * Si el return devuelve OK el proyecto se habrá editaco correctamente.
   * @param token
   * @param data
   */
  editInternalProject( token: any, data:any ) {
    let body = JSON.stringify(data);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'token': token
    });
    let url = `${this.apiUrl}editInternalProject`;
    return this.http.put(url, body, {headers}).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

  /**
   * Método para crear pryectos internos de la aplicación, recibe como parámetros el token se sesión y un modelo de proyecto interno.
   * Se manda al servidor por la ruta /createInternalProject.
   * Si el return devuelve OK el proyecto se habrá creado en la base de datos y ya sera visible para el usuario/compañia.
   * @param token
   * @param data
   */
  createInternalProject( token: any, data:any ) {
    let body = JSON.stringify(data);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'token': token
    });
    let url = `${this.apiUrl}createInternalProject`;
    return this.http.post(url, body, {headers}).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

  /**
   * Método para borrar un proyecto externo, recibe como parámetros el token de sesión, el id del proyecto y el email del usuario.
   * Se manda al servidor por la ruta /deleteExternalProject.
   * Si el return devuelve OK el proyecto se habrá borrado de la base de datos.
   * @param token
   * @param id
   * @param email
   */
  deleteExternalProject( token: any, id:any, email: any ){
    let data = {
      id: id,
      email: email
    };
    let body = JSON.stringify(data);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'token': token
    });
    let url = `${this.apiUrl}deleteExternalProject`;
    return this.http.post(url, body, {headers}).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

  /**
   * Método para borrar un proyecto interno, recibe como parámetros el token de sesión, el id del proyecto y el email del usuario.
   * Se manda al servidor por la ruta /deleteInternalProject.
   * Si el return devuelve OK el proyecto se habrá borrado de la base de datos.
   * @param token
   * @param id
   * @param email
   */
  deleteInternalProject( token: any, id:any, email: any ){
    let data = {
      id: id,
      email: email
    };
    let body = JSON.stringify(data);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'token': token
    });
    let url = `${this.apiUrl}deleteInternalProject`;
    return this.http.post(url, body, {headers}).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

  /**
   * Método para recibir todos los datos del usuario que ha iniciado sessión, recibe como parámetros el token de sesión y el email del usuario.
   * Se manda al servidor por la ruta /getUser.
   * Si el return devuelve OK se carga el usuario.
   * @param token
   * @param email
   */
  getUser( token: any, email:any ) {
    let data = {
      email: email
    };
    let body = JSON.stringify(data);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'token': token
    });
    let url = `${this.apiUrl}getUser`;
    return this.http.post(url, body, {headers}).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

  /**
   * Método para recibir del servidor todas las peticiones que tiene un usuario de unirse a un proyecto, recibe como parámetros el token de sesión y el email del usuario.
   * Se manda al servidor por la ruta /showMessagesCollaborator.
   * Si el return devuelve OK se cargan todos las peticiones.
   * @param token
   * @param email
   */
  getUserMessages( token: any, email:any ) {
    let data = {
      email: email
    };
    let body = JSON.stringify(data);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'token': token
    });
    let url = `${this.apiUrl}showMessagesCollaborator`;
    return this.http.post(url, body, {headers}).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

  /**
   * Método para recibir todos los datos de la compañia que ha iniciado sessión, recibe como parámetros el token de sesión y el email de la compañia.
   * Se manda al servidor por la ruta /getCompany.
   * Si el return devuelve OK se carga la compañia.
   * @param token
   * @param email
   */
  getCompany( token: any, email:any ) {
    let data = {
      email: email
    };
    let body = JSON.stringify(data);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'token': token
    });
    let url = `${this.apiUrl}getCompany`;
    return this.http.post(url, body, {headers}).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

  /**
   * Método para editar el usuario, recibe como parámetros el token y un modelo de usuario.
   * Se manda al servidor por la ruta /editUser.
   * Si el return devuelve OK el usuario de habrá editado correctamente.
   * @param token
   * @param user
   */
  editUser( token: any, user: User) {
    let body = JSON.stringify(user);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'token': token
    });
    let url = `${this.apiUrl}editUser`;
    return this.http.put(url, body, {headers}).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

  saveImg(file: File, email: any){
    let url = `${this.apiUrl}uploadImage`;
    let formData = new FormData();
    formData.append("image", file, file.name);
    formData.set("email", email);
    return this.http.post(url, formData ).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

  saveFileProject(file: File, id: any){
    let url = `${this.apiUrl}uploadFile`;
    let formData = new FormData();
    formData.append("myFile", file, file.name);
    formData.set("id", id);
    return this.http.post(url, formData ).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

  async saveFile(file: File, id: any): Promise<any> {
    let url = `${this.apiUrl}uploadFileChat`;
    let formData = new FormData();
    formData.append("myFile", file, file.name);
    formData.set("id", id);
    return this.http.post(url, formData ).toPromise();
  }

  editCompany( token: any, company: Company) {
    let body = JSON.stringify(company);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'token': token
    });
    let url = `${this.apiUrl}editCompany`;
    return this.http.put(url, body, {headers}).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

  getProjects( token: any, email:any) {
    let data = {
      email: email
    };
    let body = JSON.stringify(data);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'token': token
    });
    let url = `${this.apiUrl}obtainAllProjects`;
    return this.http.post(url, body, {headers}).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

  getProjectsById( token: any, email:any, id: any) {
    let data = {
      email: email,
      id: id
    };
    let body = JSON.stringify(data);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'token': token
    });
    let url = `${this.apiUrl}obtainProjectsById`;
    return this.http.post(url, body, {headers}).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

  getProjectsNameAndId( token: any, email:any) {
    let data = {
      email: email
    };
    let body = JSON.stringify(data);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'token': token
    });
    let url = `${this.apiUrl}obtainProjectNameAndId`;
    return this.http.post(url, body, {headers}).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

  getProjectsThatHeWorks( token: any, email:any) {
    let data = {
      email: email
    };
    let body = JSON.stringify(data);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'token': token
    });
    let url = `${this.apiUrl}obtainAllProjectsThatHeWorks`;
    return this.http.post(url, body, {headers}).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

  getProjectsByName( token: any, email:any , name: any) {
    let data = {
      email: email,
      name: name
    };
    let body = JSON.stringify(data);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'token': token
    });
    let url = `${this.apiUrl}obtainProjectName`;
    return this.http.post(url, body, {headers}).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

  getProjectsByCategory( token: any, email:any , category: any) {
    let data = {
      email: email,
      category: category
    };
    let body = JSON.stringify(data);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'token': token
    });
    let url = `${this.apiUrl}obtainProjectCategory`;
    return this.http.post(url, body, {headers}).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

  getProjectsByTag( token: any, email:any , tags: any ) {
    let data = {
      email: email,
      tags: tags
    };
    let body = JSON.stringify(data);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'token': token
    });
    let url = `${this.apiUrl}obtainProjectTags`;
    return this.http.post(url, body, {headers}).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

  getUsersBySkills( token: any, email:any , skills: any ){
    let data = {
      email: email,
      skills: skills
    };
    let body = JSON.stringify(data);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'token': token
    });
    let url = `${this.apiUrl}getUsersBySkills`;
    return this.http.post(url, body, {headers}).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

  getUsersByCertificates( token: any, email:any , certificates: any ){
    let data = {
      email: email,
      certificates: certificates
    };
    let body = JSON.stringify(data);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'token': token
    });
    let url = `${this.apiUrl}getUsersByCertificates`;
    return this.http.post(url, body, {headers}).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

  getUsersByCourses( token: any, email:any , courses: any ){
    let data = {
      email: email,
      courses: courses
    };
    let body = JSON.stringify(data);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'token': token
    });
    let url = `${this.apiUrl}getUsersByCourses`;
    return this.http.post(url, body, {headers}).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

  joinProject( token: any, email:any , projectId: any) {
    let data = {
      email: email,
      id: projectId
    };
    let body = JSON.stringify(data);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'token': token
    });
    let url = `${this.apiUrl}addingPendingRequest`;
    return this.http.put(url, body, {headers}).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

  sendMessageCollaborator( token: any, projectId:any , userEmail: any, email: any) {
    let data = {
      email: email,
      userEmail: userEmail,
      id: projectId
    };
    let body = JSON.stringify(data);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'token': token
    });
    let url = `${this.apiUrl}sendMessageCollaborator`;
    return this.http.post(url, body, {headers}).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

  acceptPendingRequest( token: any, email: any, projectId: any, userEmail: any) {
    let data = {
      email: email,
      id: projectId,
      userEmail: userEmail
    };
    let body = JSON.stringify(data);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'token': token
    });
    let url = `${this.apiUrl}acceptPendingRequest`;
    return this.http.post(url, body, {headers}).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

  acceptOffer( token: any, email: any, projectId: any) {
    let data = {
      email: email,
      id: projectId
    };
    let body = JSON.stringify(data);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'token': token
    });
    let url = `${this.apiUrl}acceptPendingRequestCollaborator`;
    return this.http.post(url, body, {headers}).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

  denyPendingRequest( token: any, email: any, projectId: any, userEmail: any) {
    let data = {
      email: email,
      id: projectId,
      userEmail: userEmail
    };
    let body = JSON.stringify(data);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'token': token
    });
    let url = `${this.apiUrl}denyPendingRequest`;
    return this.http.post(url, body, {headers}).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

  denyOffer( token: any, email: any, projectId: any) {
    let data = {
      email: email,
      id: projectId
    };
    let body = JSON.stringify(data);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'token': token
    });
    let url = `${this.apiUrl}denyPendingRequestCollaborator`;
    return this.http.post(url, body, {headers}).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

  kickPerson( token: any, email: any, projectId: any, userEmail: any) {
    let data = {
      email: email,
      id: projectId,
      userEmail: userEmail
    };
    let body = JSON.stringify(data);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'token': token
    });
    let url = `${this.apiUrl}kickPerson`;
    return this.http.post(url, body, {headers}).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

  counterOffer( token: any, email: any, projectId: any, price: any) {
    let data = {
      email: email,
      id: projectId,
      price: price
    };
    let body = JSON.stringify(data);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'token': token
    });
    let url = `${this.apiUrl}addingCounterOffer`;
    return this.http.post(url, body, {headers}).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

  acceptCounterOffer( token: any, email: any, projectId: any, price: any, userEmail: any ){
    let data = {
      email: email,
      id: projectId,
      userEmail: userEmail,
      price: price
    };
    let body = JSON.stringify(data);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'token': token
    });
    let url = `${this.apiUrl}acceptCounterOffer`;
    return this.http.post(url, body, {headers}).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

  denyCounterOffer( token: any, email: any, projectId: any, userEmail: any, price: any ){
    let data = {
      email: email,
      id: projectId,
      userEmail: userEmail,
      price: price
    };
    let body = JSON.stringify(data);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'token': token
    });
    let url = `${this.apiUrl}denyCounterOffer`;
    return this.http.post(url, body, {headers}).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

  closeProject( token: any, email: any, projectId: any) {
    let data = {
      email: email,
      id: projectId
    };
    let body = JSON.stringify(data);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'token': token
    });
    let url = `${this.apiUrl}closeProject`;
    return this.http.post(url, body, {headers}).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

  payUser( token: any, amount: any, userEmail: any, projectId: any){
    let data = {
      amount: amount,
      email: userEmail,
      id: projectId
    };
    let body = JSON.stringify(data);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'token': token
    });
    let url = `${this.apiUrl}buy`;
    return this.http.post(url, body, {headers}).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

  evaluateUser( token: any, email: any, projectId: any, userEmail: any, score: any ){
    let data = {
      email: email,
      projectId: projectId,
      userEmail: userEmail,
      score: score
    };
    let body = JSON.stringify(data);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'token': token
    });
    let url = `${this.apiUrl}addScore`;
    return this.http.post(url, body, {headers}).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

  getDeliveries(chatId: any){
    let id = chatId;
    let data = {
      id: id
    };
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    let body = JSON.stringify(data);
    let url = `${this.apiUrl}getDeliveriesById`;
    return this.http.post(url, body, {headers}).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

  downloadReport(file){
    // Create url
    let url = `${this.apiUrl}download`;
    var body = { filename: file };

    return this.http.post(url, body, {
      responseType: "blob",
      headers: new HttpHeaders().append("Content-Type", "application/json")
    });
  }

  downloadFile(file){
    // Create url
    let url = `${this.apiUrl}downloadFile`;
    var body = { filename: file };

    return this.http.post(url, body, {
      responseType: "blob",
      headers: new HttpHeaders().append("Content-Type", "application/json")
    });
  }

  //--- ADMIN ----

  getUsers(token: any, email: any, userType: any) {
    let data = {
      email: email,
      userType: userType
    };
    let body = JSON.stringify(data);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'token': token
    });
    let url = `${this.apiUrl}getUsers`;
    return this.http.post(url, body, {headers}).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

  editUserAdmin( token: any, user: User) {
    let body = JSON.stringify(user);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'token': token
    });
    let url = `${this.apiUrl}editUserAdmin`;
    return this.http.put(url, body, {headers}).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

  editCompanyAdmin( token: any, company: Company) {
    let body = JSON.stringify(company);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'token': token
    });
    let url = `${this.apiUrl}editCompanyAdmin`;
    return this.http.put(url, body, {headers}).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

  newUserOrCompany( token: any, data: any ) {
    let body = JSON.stringify(data);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'token': token
    });
    let url = `${this.apiUrl}newUser`;
    return this.http.post(url, body, {headers}).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

  deleteUserOrCompanyAdmin( token: any, email: any, userEmail: any, userType: any ){
    let data = {
      email: email,
      userEmail: userEmail,
      userType: userType
    };
    let body = JSON.stringify(data);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'token': token
    });
    let url = `${this.apiUrl}removeAccount`;
    return this.http.post(url, body, {headers}).pipe(map( res =>{
      console.log(res);
      return res;
    }));
  }

}
