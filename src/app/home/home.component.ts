import { Component, OnInit } from '@angular/core';

// 載入資料來源。
import { Router } from '@angular/router';

// 引用資料類
import { Productinfo } from '../productinfo';
// 載入 Service
import { ProductService } from '../product.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productlists: Productinfo[] = [];

  // 建構子
  constructor(private productService: ProductService, private router: Router) {  }

  // 初始化，要先元件 implements OnInit
  ngOnInit() {
    this.getProducts();
  }
  getProducts(): void {
    this.productlists = this.productService.getProduct();
  }

  // 觸發事件 函式
  notYet(): void {
    alert('工程師正在努力施工中...');
  }

  id:string = '';
  show(p_id:string): void {
  this.router.navigate(['/show'], {
      queryParams: {
        id: p_id,
      }
    });
  }

  isValue: number = 0;

  onClick(category: string) {
    if (category == '零食') {
      this.productlists = this.productService.getProduct().filter(product => product.category == '零食');
      this.isValue = 1;
    }
    else if (category == '糖果') {
      this.productlists = this.productService.getProduct().filter(product => product.category == '糖果');
      this.isValue = 2;
    }
    else if (category == '飲品') {
      this.productlists = this.productService.getProduct().filter(product => product.category == '飲品');
      this.isValue = 3;
    }
    else {
      this.productlists = this.productService.getProduct();
      this.isValue = 0;
    }
  }

}
