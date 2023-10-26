import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { signupdata } from 'src/app/models/reg';
import { SignupService } from 'src/app/services/signup.service';

@Component({
  selector: 'app-addpatient',
  templateUrl: './addpatient.component.html',
  styleUrls: ['./addpatient.component.css']
})
export class AddpatientComponent implements OnInit {

  constructor(private router:Router,private service:SignupService) { }
  signup:FormGroup=new FormGroup({
    firstName:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z][a-zA-Z ]+"), Validators.minLength(3), Validators.maxLength(25) ]),
    lastName:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z][a-zA-Z ]+"),Validators.minLength(7), Validators.maxLength(25) ]),
    userName:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z0-9'-'\s]*")]),
    age:new FormControl('',[Validators.required,Validators.pattern("^[0-9]{1,3}$"),Validators.min(1),Validators.max(120)]),
    nationalId:new FormControl('',[Validators.required,Validators.pattern("^(2|3)[0-9]{6}(230)[0-9]{4}$"),Validators.minLength(14), Validators.maxLength(14)]),
    bloodType:new FormControl('',),
    phoneNumber:new FormControl('',[Validators.required,Validators.pattern("^(010|011|012|015)[0-9]{8}$") ,Validators.maxLength(11) ,Validators.minLength(11)]),
    address:new FormControl(''),
    gender:new FormControl('',[Validators.required]),
    mail:new FormControl('',Validators.email),
    password:new FormControl('',[Validators.required,Validators.minLength(8)])
  });
  nationalidflag:boolean=true
  submitted:boolean=false
  successflag:boolean=false
  errorflag:boolean=false
  patient:signupdata={
    firstName: '',
    lastName: '',
    createdDtm: '',
    age: 0,
    nationalId: '',
    bloodType: '',
    phoneNumber: '',
    address: '',
    gender: '',
    userName: '',
    mail: '',
    password: '',
    role: '',
    isActive: true,
    image: undefined
  }
  errmess=""
  imagebase64:any="iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC"
  ngOnInit(): void {
  }
  get userfirstnamex(){
    return this.signup.controls['firstName']
  }
  get userlastnamex(){
    return this.signup.controls['lastName']
  }
  get usernamex(){
    return this.signup.controls['userName']
  }
  get useragex(){
    return this.signup.controls['age']
  }
  get userimagex(){
    return this.signup.controls['image']
  }
  get usernationalidx(){
    return this.signup.controls['nationalId']
  }
  get userbloodx(){
    return this.signup.controls['bloodType']
  }
  get userphonex(){
    return this.signup.controls['phoneNumber']
  }
  get useraddressx(){
    return this.signup.controls['address']
  }
  get usergenderx(){
    return this.signup.controls['gender']
  }
  get usermailx(){
    return this.signup.controls['mail']
  }
  get userpassx(){
    return this.signup.controls['password']
  }
  submit(form:any)
  {
    this.submitted=true
      if(this.signup.valid&&this.nationalidflag)
      {
   
        this.patient.firstName=this.userfirstnamex.value
        this.patient.lastName=this.userlastnamex.value
        this.patient.createdDtm=new Date().toISOString()
        this.patient.age=parseInt(this.useragex.value)
        this.patient.nationalId=String(this.usernationalidx.value)
        this.patient.bloodType=this.userbloodx.value
        this.patient.phoneNumber=this.userphonex.value
        this.patient.address=this.useraddressx.value
        this.patient.gender=this.usergenderx.value
        this.patient.userName=this.usernamex.value
        this.patient.mail=this.usermailx.value
        this.patient.password=this.userpassx.value
        this.patient.role='patient'
        this.patient.isActive=true
        this.patient.image=this.imagebase64
      this.service.addpatient(this.patient).subscribe(
        (res:any)=>
        {
          this.successflag=true
          form.resetForm()
          this.submitted=false
          setTimeout(() => {
            this.successflag=false
          }, 1000);
        },
      (err:any)=>
      {
        if(err.error.text!="Username already taken."){
        this.successflag=true
          form.resetForm()
          this.submitted=false
          setTimeout(() => {
            this.successflag=false
          }, 2000);
      }
      else{
        this.errorflag=true
         setTimeout(() => {
           this.errorflag=false
           this.submitted=false
         }, 2000);
        }
       }
      );

    }
  }  
  validationntionalid(event:any){
    let id=event.target.value
    if(parseInt(id.substring(0,1))==2){
      if(parseInt(id.substring(1,3))>22){
        if((parseInt(id.substring(3,5))<13)&&(parseInt(id.substring(3,5))>0)){
        if((parseInt(id.substring(5,7))<=31)&&(parseInt(id.substring(5,7))>0)){
          this.nationalidflag=true;
        }
        else{
          this.nationalidflag=false;
        }
        }
        else{ this.nationalidflag=false;}
      }
      else{ this.nationalidflag=false;}
    }
    else{
        if((parseInt(id.substring(3,5))<13)&&(parseInt(id.substring(3,5))>0)){
        if((parseInt(id.substring(5,7))<=31)&&(parseInt(id.substring(5,7))>0)){
          this.nationalidflag=true;
        }
        else{
          this.nationalidflag=false;
        }
        }
        else{ this.nationalidflag=false;}
    }
  
  }
}
