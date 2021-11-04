import { Component, OnInit, ViewChild } from '@angular/core';
import { Paginator } from 'primeng/paginator';
import { Table, TableBody } from 'primeng/table';
import { UsuariosService } from 'src/app/core/services/usuarios/usuarios.service';
import { Usuario } from 'src/app/shared/models/Usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];

    first = 0;
    rows = 2;
    totalPages = 50;


    @ViewChild('pag') pag!:Paginator;

    constructor(private userServ:UsuariosService) {}

    ngOnInit() {
        this.userServ.getAll().then((result)=>this.usuarios = result);
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
        return this.usuarios ? this.first === this.totalPages: true;
    }

    isFirstPage(): boolean {
        return this.usuarios ? this.first === 0 : true;
    }
  

}
