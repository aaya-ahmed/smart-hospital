import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { scanList } from 'src/app/models/scan';
import { ServicesService } from 'src/app/services/services.service';
import { SidemanagerService } from 'src/app/services/sidemanager.service';

@Component({
  selector: 'app-labform',
  templateUrl: './labform.component.html',
  styleUrls: ['../../../styles/addingform.css','./labform.component.css']
})
export class LabformComponent implements OnInit {
  numflag=false;
  catflag=false;
  test:any;
  submitted:boolean=false;
  updateflag:boolean=false;
  subscriber:any;
  noParamtersflag=false;
  addLabGroup:FormGroup=new FormGroup({
    testName:new FormControl('',[Validators.required,Validators.minLength(2)]),
    testCharge:new FormControl(null,[Validators.required,(Validators.pattern("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$"))]),
    numericalParamters:new FormArray([]),
    categoricalParamters:new FormArray([])
  });
  constructor(private testService:ServicesService,private sidehost:SidemanagerService) { }
  ngOnInit(): void {
    this.subscriber=this.sidehost.control.subscribe({
      next:res=>{
        if(res.data?.test){
          this.getTestInfo(res.data?.test.id)
          this.updateflag=true;
        }
      }
    })
        // on the begning the length of formGroup "numericalParamters" is 1 so if i don't press in add new paramter
    //button formGroup still has empty object which can send it to backend
  }
  get testName(){
    return this.addLabGroup.get('testName');
  } 
  get testCharge(){
    return this.addLabGroup.get('testCharge');
  }
  get numericalParamters(){
    return this.addLabGroup.get('numericalParamters') as FormArray;
  }
  get categoricalParamters(){
    return this.addLabGroup.get('categoricalParamters') as FormArray;
  }
  deleteNumericalParamter(index:any){
    this.numericalParamters.removeAt(index);
  }
  deleteCategoricalParamters(index:any){
    this.categoricalParamters.removeAt(index);
  }
  addcategoricalParamters(){
      this.categoricalParamters.push(
      new FormGroup({
        testParameterName:new FormControl('',[Validators.required,Validators.minLength(2)]),
        fieldType:new FormControl(''),
        inputPattern: new FormControl(''),
        unit:new FormControl(''),
        normalvalue:new FormControl('',[Validators.required])     
      })
    );
  }
  addNumericalParamters(){
    this.numericalParamters.push(
      new FormGroup({
        testParameterName:new FormControl('',[Validators.required,Validators.minLength(2)]),
        fieldType:new FormControl(''),
        inputPattern: new FormControl(''),
        unit:new FormControl(''),
        min_Range:new FormControl(null,[Validators.required,Validators.pattern("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$")]),
        max_Range:new FormControl(null,[Validators.required,Validators.pattern("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$")])
      })
   );
}
  addLab(){
    if(this.test?.id){
      this.update()
    }
    else{
      this.add()
    }
}
  private add(){
      if(this.numericalParamters.value.length>0 || this.categoricalParamters.value.length>0)
    {
      this.submitted=true;
      this.noParamtersflag=false;
      if(this.addLabGroup.valid){
      let testData:any={
        'name':this.testName?.value,
        'testCharge':this.testCharge?.value,
        'categoricalParamters':this.categoricalParamters.value,
        'numericalParamters':this.numericalParamters.value
      };
        this.testService.post('MedicalTest/add',testData).subscribe(
          (res:any)=>{
           this.close(res)
         },
           (err:any)=>{
            this.submitted=false
           });
    }
  }
  }
  private update(){
    if(this.testName?.valid&&this.testCharge?.valid){
      this.submitted=true;
      let updatedData:any={
         id:this.test.id,
         name:this.addLabGroup.value.testName,
         testCharge:this.addLabGroup.value.testCharge,
          categoricalParamters:this.test.categoricalParamters,
        numericalParamters:this.test.numericalParamters
       }    
       this.testService.update('MedicalTest/update',updatedData).subscribe(
         (res:any)=>{
          this.close(res)
       },
         (err:any)=>{
          this.submitted=false;
         });
    }
  }
  getTestInfo(id:number){    
    this.testService.get('MedicalTest/getById/'+id).subscribe(res=>
      {        
        this.test=res;
        this.addLabGroup.patchValue({
          testName:this.test.name,
          testCharge:this.test.testCharge
        })
      });
  }
  close(data=null){
    this.subscriber?.unsubscribe()
    this.sidehost.setControl({open:false,component:'',data:data})
  }
}
