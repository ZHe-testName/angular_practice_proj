import { AlertService } from './../shared/services/alert.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from 'src/app/shared/posts.service';
import { Subscription, switchMap } from 'rxjs';
import { Post } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy{

  form: FormGroup
  post: Post
  submitted: boolean = false
  uSub: Subscription

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private alertService: AlertService, 
  ) { }

  ngOnInit(): void {
    this.route.params.pipe( //получаем  айди из
      switchMap((params: Params) => {//строки запроса
        return this.postsService.getPostById(params['id']);//получаем нужный пост
      })
    )//от этого стрима не нужно отписыватся так как ангуляр сам это делает со стандартными стримами
    .subscribe((post: Post) => {//после формируем и инитим форму для редактирования
      this.post = post;

      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required),
      });
    });
  }

  ngOnDestroy(): void {
    if(this.uSub) {
      this.uSub.unsubscribe();
    };
  }

  submit() {
    if(this.form.invalid) {
      return;
    };

    this.submitted = true;

    this.uSub = this.postsService.updatePost({
      ...this.post,
      text: this.form.value.text,
      title: this.form.value.title,
    })
    .subscribe(() => {
      this.submitted = false;

      this.alertService.warning('Post is modified!');
    });
  }

};
