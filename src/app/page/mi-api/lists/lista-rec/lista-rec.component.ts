import { Component, Input, ViewChild } from '@angular/core';
import { Recetas } from '../interface/recetas';
import { NgFor, NgIf } from '@angular/common';
import { RecetasService } from '../services/recetas.service';
import { ModalAgregarComponent } from '../modal-agregar/modal-agregar.component';
import { ModalEditarComponent } from '../modal-editar/modal-editar.component';

@Component({
  selector: 'app-lista-rec',
  standalone: true,
  imports: [NgFor, NgIf, ModalAgregarComponent, ModalEditarComponent],
  templateUrl: './lista-rec.component.html',
  styleUrl: './lista-rec.component.css'
})
export class ListaRecComponent {
  @Input() recetas: Recetas | undefined
  constructor(private _srvRecetas:RecetasService){}
  @ViewChild(ModalAgregarComponent) public modal!: ModalAgregarComponent
  @ViewChild(ModalEditarComponent) public modal2!: ModalEditarComponent
  
  actualizarElemento(){
    this._srvRecetas.getRescetas().subscribe(rece => {
      this.recetas = rece
    })
  }

  eliminar(id:string){
    this._srvRecetas.deleteReceta(id).subscribe({
      next:ne=>{this.actualizarElemento()}
    })
  }
}
