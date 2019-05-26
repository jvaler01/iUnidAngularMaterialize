import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {User} from '../models/user';
import {map} from 'rxjs/operators';
import {Company} from '../models/Company';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {
  apiUrl = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }
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
