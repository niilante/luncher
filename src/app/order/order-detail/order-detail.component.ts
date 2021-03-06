import {ActivatedRoute, Params, Router} from '@angular/router';
import {OrderService} from './../shared/order.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Order } from './../models/order';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  currentUser: firebase.User;
  order: Order;
  constructor(private orderService: OrderService, private af: AngularFire, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.af.auth.subscribe((auth) => {
      this.currentUser = auth.auth;
    });
     this.route.params.switchMap((params: Params) => this.orderService.getByKey(params['orderid']))
     .subscribe((order: Order) => this.order = order);
  }

  /**
   * Completes an order with an optional estimated delivery time
   * @param deliveryTime adds a estimated time for delivery to the order (optional)
   */
  onComplete(deliveryTime?: string) {
    if (this.currentUser.uid !== this.order.createdFrom.uid) {
      return;
    }
    this.order.delivery = deliveryTime;
    this.orderService.completeOrder(this.order);
    this.router.navigate(['/order']);
  }
}
