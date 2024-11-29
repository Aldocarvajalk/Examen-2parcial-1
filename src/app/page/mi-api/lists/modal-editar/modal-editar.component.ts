import { Component, ElementRef, EventEmitter, Inject, Input, Output, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RecetasService } from '../services/recetas.service';
import { isPlatformBrowser } from '@angular/common';
import { Receta } from '../interface/recetas';

@Component({
  selector: 'app-modal-editar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modal-editar.component.html',
  styleUrl: './modal-editar.component.css'
})
export class ModalEditarComponent {
  @ViewChild('modalEleent') public modal!: ElementRef
  constructor(private _srvRecetas:RecetasService, @Inject(PLATFORM_ID) private plataformId: object){}
  @Output() recetaAgregada = new EventEmitter<Receta>();
  @Input() receta: Receta = {
    titulo: '',
    ingredientes: [''],
    pasos: [''],
    categoria: '',
    tiempoPreparacion: 0,
    autor: ''
  };
  private bootstrapModal: any

  ingredientesString: string = '';
  pasosString: string = '';

  ngOnChanges() {
    if (this.receta) {
      this.ingredientesString = this.receta.ingredientes.join(', ');
      this.pasosString = this.receta.pasos.join(', ');
    }
  }
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

  open(rece:Receta) {
    this.receta = rece
    this.ingredientesString = rece.ingredientes.join(', ');
    this.pasosString = rece.pasos.join(', ');
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

  editarReceta(form: any) {
    if (form.valid) {
      const recetaActualizada: Receta = {
        ...this.receta,
        titulo: form.value.titulo,
        categoria: form.value.categoria,
        tiempoPreparacion: form.value.tiempoPreparacion,
        autor: form.value.autor,
        ingredientes: this.ingredientesString.split(',').map((i) => i.trim()),
        pasos: this.pasosString.split(',').map((p) => p.trim()),
      };

      this._srvRecetas.putReceta(this.receta._id!, recetaActualizada).subscribe({
        next: next => {
          this.recetaAgregada.emit();
          this.close()
        }
      })
      
    }
  }
}
