import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[app-count]',
  standalone: false
})
export class CountDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {
    // Adicionando a classe 'quantity-control' ao elemento ao qual a diretiva é aplicada
    this.renderer.addClass(this.el.nativeElement, 'quantity-control');
  }

}
