import { Injectable } from '@angular/core';
// 引用資料類別
import { Productinfo } from './productinfo';
// 引用資料
import { productlist } from './productlist';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  // 回傳商品列表
  getProduct(): Productinfo[] {
    return productlist;
  }
}
