import { Component, ElementRef, EventEmitter, Inject, Output, PLATFORM_ID, ViewChild } from '@angular/core';
import { RecetasService } from '../services/recetas.service';
import { Receta } from '../interface/recetas';
import {FormsModule} from '@angular/forms'
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-modal-agregar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modal-agregar.component.html',
  styleUrl: './modal-agregar.component.css'
})
export class ModalAgregarComponent {
  @ViewChild('modalEleent') public modal!: ElementRef
  constructor(private _srvRecetas:RecetasService, @Inject(PLATFORM_ID) private plataformId: object){}
  @Output() recetaAgregada = new EventEmitter<Receta>();
  private bootstrapModal: any
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.plataformId)) {
      this.inicializarModal();
    }
    if (this.modal) {
      console.log('Modal inicializado:', this.modal);
    }
  }

  inicializarModal() {
    import('bootstrap').then((boostrap) => {
      this.bootstrapModal = new boostrap.Modal(this.modal.nativeElement);
    });
  }

  open() {
    if (isPlatformBrowser(this.plataformId)) {
      if (this.bootstrapModal) {
        this.bootstrapModal.show();
      } else {
        this.inicializarModal();
        setTimeout(() => {
          this.bootstrapModal.show();
        }, 0);
      }
    }
  }

  close() {
    if (isPlatformBrowser(this.plataformId)) {
      if (this.bootstrapModal) {
        this.bootstrapModal.hide(); 
      } else {
        this.inicializarModal(); 
        setTimeout(() => {
          this.bootstrapModal.hide();
        }, 0);
      }
    }
  }

  agregarReceta(form: any) {
    if (form.valid) {
      const nuevaReceta: Receta = {
        titulo: form.value.titulo,
        ingredientes: form.value.ingredientes.split(',').map((i: string) => i.trim()),
        pasos: form.value.pasos.split(',').map((p: string) => p.trim()),
        categoria: form.value.categoria,
        tiempoPreparacion: form.value.tiempoPreparacion,
        autor: form.value.autor,
      };

      this._srvRecetas.postRecetas(nuevaReceta).subscribe({
        next: next => {
          this.recetaAgregada.emit();
          this.close()
        }
      })
      
    }
  }
}
