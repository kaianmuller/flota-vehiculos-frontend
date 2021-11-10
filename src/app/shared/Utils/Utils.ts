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


    static convertUpperCase(obj:any){
      for(let key in obj){
        if(typeof obj[key] == 'string' && key != 'descripcion' && key != 'login' && key != 'contrasena'){
          obj[key] = obj[key].toUpperCase();
        }
      }
      return obj;
    }


    static isEmpty(obj:any){
      if(Object.values(obj).length===0){
        return true;
      }
      return false;
    }

    
  }