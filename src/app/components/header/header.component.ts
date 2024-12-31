import { ICartItem } from './../../interfaces/icartitem'; // Corrigido o nome do arquivo
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menuOpen = false;
  cartItemCount: number = 0; // Contador de itens no carrinho
  cartItems: ICartItem[] = []; // Tipagem dos itens do carrinho

  ngOnInit(): void {
    this.loadCartItemCount();
  }

  // Alterna o estado do menu (aberto ou fechado)
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  // Carrega o número de itens no carrinho do localStorage
  loadCartItemCount(): void {
    if (typeof window !== 'undefined' && localStorage) { // Verifica se localStorage está disponível
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        this.cartItems = JSON.parse(storedCart);
        this.cartItemCount = this.cartItems.reduce((total, item: ICartItem) => {
          return total + item.quantity; // Soma as quantidades dos itens
        }, 0);
      }
    } else {
      this.cartItemCount = 0; // Valor padrão caso localStorage não esteja disponível
    }
  }
}
