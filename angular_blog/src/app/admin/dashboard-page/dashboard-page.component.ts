import { AlertService } from './../shared/services/alert.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/shared/interfaces';
import { PostsService } from 'src/app/shared/posts.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = []
  searchStr: string = ''
  dSub: Subscription
  pSub: Subscription //переменная для возможности отмены подписви на посты в стриме
                      //нужна для избежания утечек памяти
  constructor(
    private postService: PostsService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.pSub = this.postService.getAllPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  ngOnDestroy(): void {
    if(this.pSub) {
      this.pSub.unsubscribe();//избегаем утечек памяти
    };

    if(this.dSub) {
      this.dSub.unsubscribe();
    };
  }

  removePost(id: string) {
    this.dSub = this.postService.removePost(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);

      this.alertService.danger('Post was deleted!');
    });
  }
}
