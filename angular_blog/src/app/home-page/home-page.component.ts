import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { PostsService } from '../shared/posts.service';
import { Post } from '../shared/interfaces';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  //тут мы будем следить за постами с помощю async pipe
  posts$: Observable<Post[]> //создаем Observable объект для слежения за паостами

  constructor(
    private postsService: PostsService,
  ) { }

  ngOnInit(): void {
    this.posts$ = this.postsService.getAllPosts();//от него не нужно отписываться по тому что нет subscribe()
  }

}
