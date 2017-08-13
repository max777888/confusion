import { Component, OnInit } from '@angular/core';

import { Dish } from '../shared/dish';
import { Leader } from '../shared/leader';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader:Leader;
  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
     private route: ActivatedRoute,
    private leaderservice:LeaderService) { }

  ngOnInit() {
     /*this.dishservice.getFeaturedDish()
      .then(dish => this.dish = dish);*/
     // this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params
      .switchMap((params: Params) => this.dishservice.getFeaturedDish())
      .subscribe(dish => { this.dish = dish; });  
    this.promotion = this.promotionservice.getFeaturedPromotion();
    this.leader=this.leaderservice.getFeaturedLeader();
  }

}