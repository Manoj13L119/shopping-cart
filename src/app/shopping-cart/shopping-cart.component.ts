import { Component, Inject, Input, OnInit } from '@angular/core';
import { ShoppingCart } from './model/shoppingCart';
import { SaveItemsSevice } from './service/save-items.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  providers: [SaveItemsSevice]
})
export class ShoppingCartComponent implements OnInit {
  itemList: Array<ShoppingCart>
  addItem: ShoppingCart;
  nameRequired: boolean = false;
  showCart: boolean = false;
  isEdited: boolean = false;
  getItemId: string = '';
  backendcodeEnabled = false;

  constructor(@Inject(SaveItemsSevice) public saveItemsService: SaveItemsSevice) { 
    this.saveItemsService = saveItemsService;
  }

  ngOnInit(): void {
    // this.addItem = new ShoppingCart();
    this.itemList = [{ itemId: '101', itemName: 'Laptop', itemDescription: 'Laptops', price: '40000', quantity: '2', totalCost: '80000' }]
    this.clearItemsinCart();
  }

  saveAll(): void {
    if (this.addItem.itemName && this.addItem.itemDescription && this.addItem.price && this.addItem.quantity) {
      if (this.isEdited) {
        for (let index in this.itemList) {
          if (index == this.getItemId) {
            this.itemList[index].itemName = this.addItem.itemName;
            this.itemList[index].itemDescription = this.addItem.itemDescription;
            this.itemList[index].price = this.addItem.price;
            this.itemList[index].quantity = this.addItem.quantity;
            this.itemList[index].totalCost = this.addItem.totalCost;
          }
        }
        this.isEdited = false;
      } else {
        let itemId = '';
        if (this.itemList.length > 0) {
          itemId = String(Number(this.itemList[this.itemList.length - 1].itemId) + 1);
        } else {
          itemId = '101';
        }
        this.addItem.itemId = itemId;
        if (this.backendcodeEnabled) {
          this.saveItemsService.savecartItems(this.addItem).subscribe(items => {
            this.itemList = items;
          });
        } else {
          this.itemList.push(this.addItem);
        }
        console.log(this.itemList);
      }
      this.clearItemsinCart();
    }
  }

  calculateTotal(): void {
    if (this.addItem && this.addItem.price && this.addItem.quantity) {
      this.addItem.totalCost = String(Number(this.addItem.price) * Number(this.addItem.quantity));
    }
  }
  viewCart(): void {
    this.showCart = true;
  }

  modifyItem(event: any): void {
    if (event[1] == 'edit') {
      this.isEdited = true;
      this.showCart = false;
      this.getItemId = event[0];
      this.addItem = this.itemList.filter(item => item.itemId === event[0])[0]
    } else {
      if(this.backendcodeEnabled){
        this.saveItemsService.deleteItem(this.getItemId).subscribe(items => {
          this.itemList = items;
        });
      }else{
        this.itemList = this.itemList.filter(item => item.itemId !== event[0])
      }
    }
    console.log(this.itemList);
  }

  addItems(event: any): void {
    this.showCart = false;
    this.clearItemsinCart();
  }

  clearItemsinCart(): void {
    this.addItem = { itemId: '', itemName: '', itemDescription: '', price: '', quantity: '', totalCost: '' };
  }

}