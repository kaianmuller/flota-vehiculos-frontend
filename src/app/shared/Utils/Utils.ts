export default class Utils{
  
  
  
  static ip() {
        return "http://192.168.100.37:3000";
    }
  


    static firstUpperCase(word:string) {
      return (word.charAt(0).toUpperCase() + word.slice(1)).replace("_"," ").replace("Ano","Año").replace("Login","Username");
    }


    static isEmpty(obj:any){

      if(obj && Object.values(obj).length !== 0){
        return false;
      }
      return true;
    }


    static getDate(date?:any){
      if(date){
        let fecha = new Date(date);
        return new Date(fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset()));
      }else{
        let fecha = new Date();
      return  new Date(new Date(fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset())).setHours(0,0,0,0));
      }
    }

    
  }