import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, shareReplay, switchMap, tap } from 'rxjs';
import { BASE_API_URL } from '../../../environments/env';
import { Comment, Post, User } from '../../../types';
import { CallService } from '../../core/services/call.service';
import { TruncatePipe } from '../../shared/pipes/truncate.pipe';



@Component({
  selector: 'app-post',
  standalone: true,
  imports: [AsyncPipe, NgIf, TruncatePipe, RouterLink, NgFor, NgClass],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  constructor(private route:ActivatedRoute, private call:CallService, private title: Title, private meta: Meta){}
  
  post$!:Observable<Post>;
  author$!:Observable<User>;
  comments$!:Observable<Comment[]>;
  
  isCommentShown = signal(false);
  // private destroy$ = new Subject<void>();
  
  ngOnInit(){
    const {id} = this.route.snapshot.params;
    
    this.post$ = this.call.get(BASE_API_URL+'/posts/'+id).pipe(shareReplay(1), tap(
      post=> {
        //SEO tags
        this.title.setTitle(post.title)
        this.meta.updateTag(
          {
            name:'keyword',
            content:'angular, features'
          });
      
        this.meta.updateTag(
          {
            name:'description',
            content:post.body
          }); 
      }
    ));

    this.author$ = this.post$.pipe(
      switchMap(post => this.call.get(`${BASE_API_URL}/users/${post.userId}`)),
      tap(author => this.meta.updateTag({ name: 'author', content: author.name })),
      shareReplay(1)
    );


    this.comments$ = this.post$.pipe(
      switchMap(post => this.call.get(`${BASE_API_URL}/comments?postId=${post.id}`)),
      shareReplay(1)
    );
  }

  ToggleComments(){ this.isCommentShown.set(!this.isCommentShown()) }
}
