import { Component, OnInit } from '@angular/core';
import { RecetasService } from './services/recetas.service';
import { Recetas } from './interface/recetas';
import { ListaRecComponent } from "./lista-rec/lista-rec.component";

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [ListaRecComponent],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css'
})
export class ListsComponent implements OnInit{
  recetasAll:Recetas | undefined
  constructor(private _srvRecetas:RecetasService){}

  ngOnInit(): void {
    this._srvRecetas.getRescetas().subscribe(rece => {
      this.recetasAll = rece
    })
  }
}
