import { Component, ElementRef, Inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';
import { cocteles } from '../interfaces/coctel';
import { isPlatformBrowser, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() public coctel: Partial<cocteles['drinks'][number]> = {};


  @ViewChild('modalElement') public modal!: ElementRef;
  private bootstrapModal: any;
  constructor(
    @Inject(PLATFORM_ID) private plataformID: object
  ) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.plataformID)) {
      this.inicializarModal()
    }
  }

  getIngredients(coctel: any): string[] {
    return [
      coctel['strIngredient1'],
      coctel['strIngredient2'],
      coctel['strIngredient3'],
      coctel['strIngredient4'],
      coctel['strIngredient5'],
      coctel['strIngredient6'],
      coctel['strIngredient7'],
      coctel['strIngredient8'],
      coctel['strIngredient9'],
      coctel['strIngredient10'],
      coctel['strIngredient11'],
      coctel['strIngredient12'],
      coctel['strIngredient13'],
      coctel['strIngredient14'],
      coctel['strIngredient15'],
    ].filter(ingredient => ingredient); // Filtrar ingredientes vacíos
  }


  inicializarModal() {
    import('bootstrap').then(bootstrap => {
      this.bootstrapModal = new bootstrap.Modal(this.modal.nativeElement)
    })
  }

  open(coc: Partial<cocteles['drinks'][number]>) {
    this.coctel = coc
    if (isPlatformBrowser(this.plataformID)) {
      if (this.bootstrapModal) {
        this.bootstrapModal.show()
      } else {
        this.inicializarModal()
        setTimeout(() => {
          this.bootstrapModal.show();
        }, 0)
      }
    }
  }
}
