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

  getProjectsIdsNames( token: any, email:any) {
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

  getProjectsbyName( token: any, email:any , name: any) {
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

  getProjectsbyCategory( token: any, email:any , category: any) {
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

  getProjectsbytag( token: any, email:any , tags: any) {
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
}
