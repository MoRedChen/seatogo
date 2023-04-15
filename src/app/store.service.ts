import { Injectable } from '@angular/core';
// 引用資料類別
import { Storeinfo } from './storeinfo';
// 引用資料
import { storelist } from './storelist';
// 引用資料
import { warehouselist } from './warehouselist';
// 引用資料
import { nulllist } from './nulllist';

@Injectable({
  providedIn: 'root'
})

export class StoreService {

  constructor() { }

  mySqrt (x: number): number {
    let i = 1
    while (i*i<=x){
        i=i+0.0001;
    }
    return i-0.0001;
  }

  myPow (x: number): number {
    return x*x*100000000;
  }

  getNum (s_id: number, p_id: string): number {
    return +(warehouselist.filter(item => item.s_id==storelist[s_id].id).find(item => item.p_id==p_id)?.num??0);
  }

  getDistance (s_id: number, u_lat: number, u_lng: number): number {
    return this.mySqrt(this.myPow(storelist[s_id].lat-u_lat)+this.myPow(storelist[s_id].lng-u_lng));
  }

  // 回傳商店列表
  getStore(u_lat: number, u_lng: number, p_id:string): Storeinfo {
    let number:number = 1;
    for (let i = 0; i < storelist.length; i++) {
      if (this.getDistance(i, u_lat, u_lng) < this.getDistance(number, u_lat, u_lng)) {
        if (this.getNum(i, p_id)>0) {
          number = i;
        }
      }
      else if (this.getNum(number, p_id)==0) {
        if (this.getNum(i, p_id)>0) {
          number = i;
        }
      }
    }
    if (this.getNum(number, p_id)<0) {
      return nulllist[0];
    } else {
      return storelist[number];
    }
  }
}
