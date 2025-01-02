import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { logindata } from '../models/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogInAndOutService {
  user:any;
  private logoutstate:boolean=true
  private baseurl:string="https://localhost:7163/api/Authentication/login";
  private usertoken:any
  constructor(private http:HttpClient) { }
  auth_user(user:logindata){
    return this.http.post(this.baseurl,user);
  }
  getinfo(role:string,id:number):Observable<any> {
    if(role.toLowerCase ()=="doctor"){
      this.usertoken=localStorage.getItem("userToken")
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.usertoken}`);
      this.user= this.http.get("https://localhost:7163/api/Doctor/"+id,{ headers: headers })
      }
    else if(role.toLowerCase ()=="nurse"){
      this.usertoken=localStorage.getItem("userToken")
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.usertoken}`);
      this.user= this.http.get("https://localhost:7163/api/Nurse/"+id,{ headers: headers });
      }
    else if(role.toLowerCase ()=="admin"){
      this.usertoken=localStorage.getItem("userToken")
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.usertoken}`);
      console.log(headers)
      this.user= this.http.get("https://localhost:7163/api/Admin/admin/"+id,{ headers: headers });
      }
    else if(role.toLowerCase ()=="receptionist"){
      this.usertoken=localStorage.getItem("userToken")
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.usertoken}`);
      this.user= this.http.get("https://localhost:7163/api/Admin/receptionist/"+id,{ headers: headers });
      }
    else if(role.toLowerCase ()=="patient"){
      this.usertoken=localStorage.getItem("userToken")
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.usertoken}`);
      this.user= this.http.get("https://localhost:7163/api/Patient/"+id,{ headers: headers });
      //this.user= this.http.get("http://192.168.181.252:5050/api/Patient/"+id,{ headers: headers });
    }
      this.logoutstate=false
      return this.user
  }
  logout(){
    localStorage.removeItem("userInfo")
    localStorage.removeItem("userRole")
    localStorage.removeItem("userToken")
    localStorage.removeItem("login")
  }
  set outstate(state:boolean){
    this.logoutstate=state
  }
  get outstate(){
    return  localStorage.getItem("login")?false:true
  }
}
