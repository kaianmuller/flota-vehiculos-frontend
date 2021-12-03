

export default class Utils{
  
  
  
  static ip() {
        return "http://192.168.100.37:3000";
    }
  


    static firstUpperCase(word:string) {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }

    static toLabel(word:string){
      return word.replace("_"," ").replace("Ano","Año").replace("Login","Username")
    }
      


    static isEmpty(obj:any){
      return !(obj && Object.values(obj).length !== 0);
    }


    static getDate(date?:any){
      if(date){
        let fecha = new Date(date);
        fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset());
        return fecha;
      }else{
        let fecha = new Date();
        fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset());
        fecha.setHours(0,0,0,0);
      return fecha;
      }
    }



    static adminOptions(option:string){
      return [
        'tipos_servicio',
        'integration_api'
              ].find((i) => i == option);
    }


    static isAdminRoute(route:string){
      return [
        '/configuraciones/tipos_servicio',
        '/configuraciones/integration_api',
              ].find((i) => i == route);
    }
    
  }