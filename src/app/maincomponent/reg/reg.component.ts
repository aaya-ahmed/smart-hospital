import { Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';
import { SidemanagerService } from 'src/app/services/sidemanager.service';
@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent{
  signup:FormGroup=new FormGroup({
    firstName:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z][a-zA-Z ]+"), Validators.minLength(3), Validators.maxLength(25) ]),
    lastName:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z][a-zA-Z ]+"),Validators.minLength(3), Validators.maxLength(25) ]),
    userName:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z0-9'-'\s]*")]),
    age:new FormControl('',[Validators.required,Validators.pattern("^[0-9]{1,3}$"),Validators.min(1),Validators.max(120)]),
    nationalId:new FormControl('',[Validators.required,Validators.pattern("^(2|3)[0-9]{13}$"),Validators.minLength(14), Validators.maxLength(14)]),
    bloodType:new FormControl('',),
    phoneNumber:new FormControl('',[Validators.required,Validators.pattern("^(010|011|012|015)[0-9]{8}$") ,Validators.maxLength(11) ,Validators.minLength(11)]),
    address:new FormControl(''),
    gender:new FormControl('',[Validators.required]),
    mail:new FormControl('',Validators.email),
    password:new FormControl('',[Validators.required,Validators.minLength(8)]),
    image:new FormControl(''),
  });
  imagebase64:any="iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC"
  submitted:boolean=false
  message:string=""
  constructor(private router:Router,private services:ServicesService,private hostsetvice:SidemanagerService) { }
  get userfirstname(){
    return this.signup.controls['firstName']
  }
  get userlastname(){
    return this.signup.controls['lastName']
  }
  get username(){
    return this.signup.controls['userName']
  }
  get userage(){
    return this.signup.controls['age']
  }
  get userimage(){
    return this.signup.controls['image']
  }
  get usernationalid(){
    return this.signup.controls['nationalId']
  }
  get userblood(){
    return this.signup.controls['bloodType']
  }
  get userphone(){
    return this.signup.controls['phoneNumber']
  }
  get useraddress(){
    return this.signup.controls['address']
  }
  get usergender(){
    return this.signup.controls['gender']
  }
  get usermail(){
    return this.signup.controls['mail']
  }
  get userpass(){
    return this.signup.controls['password']
  }
  submit(){
    this.submitted=true
    this.message=""
      if(this.signup.valid){
        let patient=this.signup.value
        patient.role='patient'
        patient.isActive=true
        patient.image=this.imagebase64
        patient.age=parseInt(patient.age)
        this.services.post("Patient",patient).subscribe(
          (res:any)=>{},
          (err:any)=>{
            if(err.status==200&&err.error.text!="Username already taken."){
              this.gotologin()
            }
            else if(err.error.text=="Username already taken."){
              this.message="Username already taken."
            }
            else{
              this.message="error"
            }
            this.submitted=false
          });
      }
  } 
  uploadfile(file:any){
    this.getBase64(file).then(
      data => {
        this.imagebase64=data;
        this.imagebase64=this.imagebase64.split(",").pop();
         });
  }
  getBase64(file:any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);
      reader.onload = () =>{ resolve(reader.result)};
      reader.onerror = error => reject(error);
    });
  } 
  validationntionalid(event:any){
    let id=event.target.value
    console.log(849)

    if(parseInt(id.substring(0,1))==2){
      if(parseInt(id.substring(1,3))>22){
        if((parseInt(id.substring(3,5))<13)&&(parseInt(id.substring(3,5))>0)){
        if((parseInt(id.substring(5,7))<=31)&&(parseInt(id.substring(5,7))>0)){
          if(this.usernationalid.hasError('notvalid')){
            let {notvalid,...error} = this.usernationalid.errors||{};
            this.usernationalid.setErrors(error);
            console.log(849)
            this.userage.setValue((new Date().getSeconds() - new Date(`19${id.substring(1,3)}-${id.substring(3,5)}-${id.substring(5,7)}`).getSeconds())/31536000)
            console.log(this.userage.value)

          }
        }
        else{
          this.usernationalid.setErrors({'notvalid':true,...this.usernationalid.errors});
        }
        }
        else{
          this.usernationalid.setErrors({'notvalid':true,...this.usernationalid.errors});
        }
      }
      else{
        this.usernationalid.setErrors({'notvalid':true,...this.usernationalid.errors});
      }
    }
    else{
        if((parseInt(id.substring(3,5))<13)&&(parseInt(id.substring(3,5))>0)){
        if((parseInt(id.substring(5,7))<=31)&&(parseInt(id.substring(5,7))>0)){
          let {notvalid,...error} = this.usernationalid.errors||{};
          this.usernationalid.setErrors(error);
          this.userage.setValue((new Date().getSeconds()-new Date(`20${id.substring(1,3)}-${id.substring(3,5)}-${id.substring(5,7)}`).getSeconds())/31536000)
          console.log(this.userage.value)
        }
        else{
          this.usernationalid.setErrors({'notvalid':true,...this.usernationalid.errors});
        }
        }
        else{
          this.usernationalid.setErrors({'notvalid':true,...this.usernationalid.errors});
        }
    }
    this.usernationalid.updateValueAndValidity()
  }
  close(){
    this.hostsetvice.setControl({open:false,component:'',data:''})
  }
  gotologin(){
    this.hostsetvice.setControl({open:false,component:'',data:''})
    this.hostsetvice.setControl({open:true,component:'login',data:''})

  }

}
