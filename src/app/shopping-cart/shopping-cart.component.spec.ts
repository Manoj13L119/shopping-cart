import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SaveItemsSevice } from './service/save-items.service';

import { ShoppingCartComponent } from './shopping-cart.component';

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingCartComponent ],
      providers: [SaveItemsSevice, HttpClient,HttpHandler]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save item to cart', () => {
    component.itemList = [];
    let itemsToBeAdded = {'itemId': '101', 'itemName': 'Laptop', 'itemDescription': 'Laptops', 'price': '40000', 'quantity': '2', 'totalCost': '80000' }
    component.addItem = itemsToBeAdded;
    component.isEdited = false;
    component.backendcodeEnabled = false;
    component.saveAll()
    expect(component.itemList[0]).toEqual(itemsToBeAdded);
  });

  it('should edit item in cart', () => {
    component.itemList = [{'itemId': '101', 'itemName': 'Laptop', 'itemDescription': 'Laptops', 'price': '40000', 'quantity': '2', 'totalCost': '80000' }]
    component.isEdited = false;
    let event = [];
    event[0] = '101';
    event[1] = 'edit';
    component.modifyItem(event);
    expect(component.isEdited).toBeTruthy();
    expect(component.addItem).toEqual(component.itemList[0]);
  });

  it('should delete item in cart', () => {
    component.itemList = [{'itemId': '101', 'itemName': 'Laptop', 'itemDescription': 'Laptops', 'price': '40000', 'quantity': '2', 'totalCost': '80000' }]
    let event = [];
    event[0] = '101';
    event[1] = 'delete';
    component.modifyItem(event);
    expect(component.itemList.length).toEqual(0);
  });

});
