import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShoppingCart } from '../shopping-cart/model/shoppingCart';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {
  @Input() cartItems: Array<ShoppingCart>
  @Output() itemId: EventEmitter<any> =  new EventEmitter<any>();
  @Output() showCart =  new EventEmitter<boolean>();
  modifyCart = new Array();
  constructor() { }

  ngOnInit(): void {
    console.log(this.cartItems);
  }

  modifyItems(itemId, modifyAction): void {
    this.modifyCart = [];
    this.modifyCart.push(itemId,modifyAction);
    this.itemId.emit(this.modifyCart);
  }



  hideCart(): void {
    this.showCart.emit(true);
  }

}
