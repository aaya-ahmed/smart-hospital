import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogInAndOutService } from 'src/app/services/log-in-and-out.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css','./homemedia.css']
})
export class HomeComponent implements OnInit {
  //in small screen the navbar  will be list , so making navbar flag to open and close this list
  navbartoggle=false;

  islogout:boolean=false;
  showchatflag:boolean=false
  constructor(private route:Router,private service:LogInAndOutService) { }  
  ngOnInit(): void {
    //save login state in local storage ,and use it to make decision display login/reg button
    // in navbar or profile/logout button 
    if(localStorage.getItem("login")=="true"){
      this.service.outstate=false
    }
    else{
      this.service.outstate=true
    }
    this.islogout=this.service.outstate
  }
  //login method 
  // when user click on login button this method route to login page
  login(){
    this.route.navigate(['/login']);
  }
  //gotomyprofile method 
  // when user click on profile button this method route to profile page
  gotomyprofile(){
    this.route.navigate(['./'+localStorage.getItem("userRole")]);
  }
  //login method 
  // when user click on login button this method route to login page
  logout(){
    this.service.logout();
    this.route.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      window.location.reload()
    });
  }
  togglenavbar(){
    this.navbartoggle=!this.navbartoggle;
  }
  //openurl methhod
  //there are ai services to open this services in new page ,we make this method
  openurl(url:string){
    window.open(url,"_blank");
  }
}
