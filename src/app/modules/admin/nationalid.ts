export class nationalid{
  imagebase64:any
    validationntionalid(event:any):boolean{
        let nationalidflag=false
        let id=event.target.value
        if(parseInt(id.substring(1,3))>22){
          if((parseInt(id.substring(3,5))<13)&&(parseInt(id.substring(3,5))>0)){
          if((parseInt(id.substring(5,7))<=31)&&(parseInt(id.substring(5,7))>0)){
            nationalidflag=true;
          }
          else{
            nationalidflag=false;
          }
          }
          else{ nationalidflag=false;}
        }
        else{nationalidflag=false;}
        return nationalidflag
      }
      uploadfile(file:any){
        this.getBase64(file).then(
          data => {
            this.imagebase64=data;
            this.imagebase64=this.imagebase64.split(",").pop();
             });
        console.log(this.imagebase64)
      }
      getBase64(file:any) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () =>{ resolve(reader.result)};
          reader.onerror = error => reject(error);
        });
      }
}