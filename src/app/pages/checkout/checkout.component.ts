import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = []; // Array para armazenar os itens do carrinho
  totalAmount: number = 0; // Total do carrinho

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    // Obter o carrinho do localStorage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);

      // Calcular o valor total do carrinho
      this.calculateTotalAmount();
    }
  }

  calculateTotalAmount(): void {
    this.totalAmount = this.cartItems.reduce((total, item) => {
      // Somando o total de cada item (quantidade * preço)
      return total + item.quantity * item.product.price;
    }, 0);
  }

  changeQuantity(item: any, change: number): void {
    // Ajusta a quantidade com base no botão pressionado
    if (item.quantity + change > 0) {
      item.quantity += change;

      // Atualiza o localStorage com o novo carrinho
      localStorage.setItem('cart', JSON.stringify(this.cartItems));

      // Recalcula o total do carrinho
      this.calculateTotalAmount();
    }
  }

  removeItem(index: number): void {
    // Exibe uma caixa de confirmação antes de remover o item
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você deseja remover este item do carrinho?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, remover',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Remove o item do carrinho no índice fornecido
        this.cartItems.splice(index, 1);

        // Atualiza o localStorage com o novo estado do carrinho
        localStorage.setItem('cart', JSON.stringify(this.cartItems));

        // Recalcula o total do carrinho
        this.calculateTotalAmount();

        Swal.fire('Removido!', 'O item foi removido do carrinho.', 'success');
      }
    });
  }

  endBuy(): void {
    if (this.cartItems.length === 0) {
      Swal.fire({
        title: 'Carrinho vazio!',
        text: 'Adicione itens ao carrinho antes de finalizar a compra.',
        icon: 'info',
        confirmButtonText: 'Entendido'
      });
      return;
    }

    Swal.fire({
      title: 'Compra realizada!',
      text: 'Sua compra foi concluída com sucesso.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      // Deletar o carrinho do localStorage
      localStorage.removeItem('cart');

      // Redireciona para a página inicial ou qualquer outra página desejada
      this.router.navigate(['/']);
    });
  }
}
