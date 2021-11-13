export default class Utils{
  
  
  
  static ip() {
        return "http://localhost:3000";
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