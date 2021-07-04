import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { ShoppingCart } from "../model/shoppingCart";
import { map } from 'rxjs/operators';

@Injectable()
export class SaveItemsSevice {

    constructor( @Inject(HttpClient) private _http: HttpClient,
    ){

    }

    savecartItems(addItem: ShoppingCart): Observable<any> {
        const URL = '../saveCartItems';
        return this._http.post(URL, addItem).pipe(map((res: HttpResponse<any>) => res));
    }

    deleteItem(itemId: string): Observable<any> {
        const URL = '../deleteItem';
        let params: HttpParams = new HttpParams().set('itemId', itemId);
        return this._http.get(URL, { params: params }).pipe(map((res: HttpResponse<any>) => res));
    }

    getCartItems(searchRequest: ShoppingCart): Observable<any> {
        const searchRequestJson = JSON.stringify(searchRequest);
        let URL = '../getCartItems';
        return this._http.post<any>(URL, searchRequestJson);
    }
}