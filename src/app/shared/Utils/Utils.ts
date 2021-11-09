export default class Utils{
  
  
  
  static ip() {
        return "http://localhost:3000";
    }
    
    
    static getEnumKey(en:any,v:any){
      let k;
     Object.entries(en).forEach((value)=>{
       if(value[1] == v){
         k = value[0];
       }
     });
     return k;
    }




   static getEnumValue(en:any,k:any){
      let e;
     Object.entries(en).forEach((value)=>{
       if(value[0]==k){
        e = value[1];
       }
     });
     return e;
    }


    
  }