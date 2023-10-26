export class imageclass{
     getbase64(file:File){
        return new Promise((resolve,reject)=>{
            let filereader=new FileReader();
            filereader.readAsDataURL(file);
            filereader.onload=() =>{ resolve(filereader.result)};
            filereader.onerror=(error) =>{ reject(error)};
        })

    }
}