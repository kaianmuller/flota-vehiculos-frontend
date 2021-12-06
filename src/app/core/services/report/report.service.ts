import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Utils from 'src/app/shared/utils/Utils';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http:HttpClient) { }




  async getReportService(params:any){
    return await this.http.get(Utils.ip()+"/report",{params:params}).toPromise();
  }



}
