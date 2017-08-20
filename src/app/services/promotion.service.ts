import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { RestangularModule, Restangular } from 'ngx-restangular';
import 'rxjs/add/Observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/Observable/of';
import { Observable } from 'rxjs/Observable';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Http, Response } from '@angular/http';

@Injectable()
export class PromotionService {

  constructor(private restangular: Restangular, private ProcessHTTPMsgService: ProcessHTTPMsgService) { }

 getPromotions(): Observable<Promotion[]> {
    return this.restangular.all('promotions').getList();
 }

 getPromotion(id: number): Observable<Promotion> {
    return this.restangular.one('promotions', id);
}

getFeaturedPromotion(): Observable<Promotion> {
   return this.restangular.all('promotions').getList({featured: true}).map(promotion => promotion[0]);
}

}

 /* getPromotions(): Promotion[] {
    return PROMOTIONS;
  }

  getPromotion(id: number): Promotion {
    return PROMOTIONS.filter((promo) => (promo.id === id))[0];
  }

  getFeaturedPromotion(): Promotion {
    return PROMOTIONS.filter((promotion) => promotion.featured)[0];
  }*/
