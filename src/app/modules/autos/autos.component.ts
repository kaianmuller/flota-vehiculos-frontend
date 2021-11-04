import { Component, OnInit, ViewChild } from '@angular/core';
import { Paginator } from 'primeng/paginator';
import { AutosService } from 'src/app/core/services/autos/autos.service';
import { Params } from 'src/app/shared/generic/models/Params.model';
import { Auto } from 'src/app/shared/models/Auto.model';

@Component({
  selector: 'app-autos',
  templateUrl: './autos.component.html',
  styleUrls: ['./autos.component.css']
})
export class AutosComponent implements OnInit {

  autos: Auto[] = [];

    first = 0;
    rows = 10;
    totalPages = 50;


    @ViewChild('pag') pag!:Paginator;

    constructor(private autoServ:AutosService) {}

    ngOnInit() {
        this.autoServ.getAll(new Params(this.first,this.first+this.rows)).then((result)=>this.autos = result);
    }


    ngAfterViewInit(){
      console.log(this.pag.currentPage()); 
    }
    next() {
        this.first = this.first + this.rows;
    }

    prev() {
        this.first = this.first - this.rows;
    }

    reset() {
        this.first = 0;
    }

    isLastPage(): boolean {
        return this.autos ? this.first === this.totalPages: true;
    }

    isFirstPage(): boolean {
        return this.autos ? this.first === 0 : true;
    }

}
