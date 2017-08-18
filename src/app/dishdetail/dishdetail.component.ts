import { Component, OnInit ,Input } from '@angular/core';
import {Dish} from '../shared/dish';
import { DishService } from '../services/dish.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Comment } from '../shared/comment';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
dishcopy = null;
  dish: Dish;
 dishIds: number[];
  prev: number;
  next: number;
  errmsg:string;
  commentForm: FormGroup;
  comment: Comment;
  

  formErrors = {
    'rating': '',
    'comment': '',
    'author': ''
  };

  validationMessages = {
    'comment': {
      'required':      'Comment is required.'
    },
    'author': {
      'required':      'Author name is required.',
      'minlength':     'Author name must be at least 2 characters long.'
    }
  };  

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder) { 
    this.createForm();
  }

   createForm() {
    this.commentForm = this.fb.group({
       author: ['', [Validators.required,Validators.minLength(2)] ],
      rating: [5, Validators.required ],
      comment: ['', Validators.required ]
     
      });
  }

 onValueChanged(data?: any) {
    if (!this.commentForm) {
      return;
    }
    const form = this.commentForm;

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit() {
    this.comment = this.commentForm.value;

    var d = new Date();
    this.comment.date = d.toISOString();
    this.dish.comments.push(this.comment);

    console.log(this.comment);
    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: ''
    });

     this.dishcopy.comments.push(this.comment);
    this.dishcopy.save()
      .subscribe(dish => { this.dish = dish; console.log(this.dish); });
  }
 /* ngOnInit() {
    let id = +this.route.snapshot.params['id'];
     this.dishservice.getDish(id)
      .then(dish => this.dish = dish);
 }*/
  ngOnInit() {

    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params
      .switchMap((params: Params) => { return this.dishservice.getDish(+params['id']); })
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); },
          errmess => { this.dish = null; this.errMess = <any>errmess; });
    /*this.route.params
      .switchMap((params: Params) => this.dishservice.getDish(+params['id']))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
 */ }

  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

}


