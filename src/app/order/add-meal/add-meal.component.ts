import { Router, Params, ActivatedRoute } from '@angular/router';
import { FirebaseAuthState } from 'angularfire2';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrderService } from './../shared/order.service';
import { Order } from './../models/order';
import { Meal } from './../models/meal';
import { Component, OnInit, Inject } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { OrderUser } from 'app/order/models/user';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.css']
})
export class AddMealComponent implements OnInit {
  public meal: Meal;
  form: FormGroup;
  currentUser: firebase.User;
  order: Order;
  constructor(private orderService: OrderService, private formBuilder: FormBuilder, private af: AngularFire, private router: Router,
  private route: ActivatedRoute) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern('([0-9]{0,2}((.)[0-9]{0,2}))$')]],
      info: [''],
    });
    this.af.auth.subscribe((auth) => {
      this.currentUser = auth.auth;
    });
     this.route.params.switchMap((params: Params) => this.orderService.getByKey(params['orderid']))
     .subscribe((order: Order) => this.order = order);
  }

  /**
   * Saves the current meal to the order
   */
  onSave() {
    if (this.form.invalid) { return; }
    const meal = this.prepareSaveMeal();
    this.orderService.addMeal(this.order, meal);
    this.router.navigate(['/order']);
  }

  /**
   * Returns a Meal object from the form model
   */
  prepareSaveMeal(): Meal {
    const formModel = this.form.value;
    const saveMeal: Meal = {
      name: formModel.name as string,
      info: formModel.info as string,
      createdFrom: new OrderUser(this.currentUser),
      price: formModel.price as number
    };
    return saveMeal;
  }
}
