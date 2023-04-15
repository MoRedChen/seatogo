import { Component, OnInit } from '@angular/core';
// 載入資料來源。
import { ActivatedRoute, ParamMap} from '@angular/router';
import { Router } from '@angular/router';
// 引用資料類
import { Productinfo } from '../productinfo';
import { Storeinfo } from '../storeinfo';
// 載入 Service
import { ProductService } from '../product.service';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  productinfo: Productinfo =
  {
    id: '',
    name: '',
    description: '',
    category: '',
    price: 0,
  };

  p_id:string = '';
  p_name:string = '';
  p_description:string = '';
  p_category:string = '';
  p_price:number = 0;

  storeinfo: Storeinfo =
  {
    id: '',
    name: '',
    lat: 0,
    lng: 0
  };

  s_id:string = '';
  s_name:string = '';
  s_lat:number = 0;
  s_lng:number = 0;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private productService: ProductService, private storeService: StoreService) {}

  public u_latitude:any;
  public u_longitude: any;
  ngOnInit(): void {
    this.p_id = this.activatedRoute.snapshot.queryParamMap.get('id')!.toString();
    this.getProducts(this.p_id);
    this.getProductInfo();
    this.getStore();
  }

  getProducts(p_id:string): void {
    this.productinfo = this.productService.getProduct().find(product => product.id == p_id)!;
    if (this.productService.getProduct().filter(product => product.id == p_id).length == 0) {
      this.router.navigate(['/error_404']);
    }
  }

  getProductInfo(): void {
    this.p_id = this.productinfo.id;
    this.p_name = this.productinfo.name;
    this.p_description = this.productinfo.description;
    this.p_category = this.productinfo.category;
    this.p_price = this.productinfo.price;
  }

  getStore(): void {
    // getLocation()
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        if (position) {
          console.log("Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude);
          this.u_latitude = position.coords.latitude;
          this.u_longitude = position.coords.longitude;
          console.log(this.u_latitude);
          console.log(this.u_longitude);
          this.storeinfo = this.storeService.getStore(this.u_latitude, this.u_longitude, this.p_id);
          this.getStoreInfo(this.storeinfo);
        }
      },
        (error: any) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  getStoreInfo(storeinfo: Storeinfo): void {
    this.s_id = this.storeinfo.id;
    this.s_name = this.storeinfo.name;
    this.s_lat = this.storeinfo.lat;
    this.s_lng = this.storeinfo.lng;
  }

}
