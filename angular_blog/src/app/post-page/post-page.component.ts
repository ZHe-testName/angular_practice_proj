import { ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Post } from '../shared/interfaces';
import { PostsService } from '../shared/posts.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  post$: Observable<Post>

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
  ) { }

  ngOnInit(): void {
    this.post$ = this.route.params
      .pipe(switchMap((params: Params) => {//switchMap позволяет изменить направление стрима к нужному стриму
        return this.postsService.getPostById(params['id']);
      }));
  }

}
