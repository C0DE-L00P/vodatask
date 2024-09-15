import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, shareReplay, switchMap } from 'rxjs';
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
  constructor(private route:ActivatedRoute, private call:CallService){}
  
  post$!:Observable<Post>;
  author$!:Observable<User>;
  comments$!:Observable<Comment[]>;
  
  isCommentShown = signal(false);
  // private destroy$ = new Subject<void>();
  
  ngOnInit(){
    const {id} = this.route.snapshot.params;
    
    this.post$ = this.call.get(BASE_API_URL+'/posts/'+id).pipe(shareReplay(1));

    this.author$ = this.post$.pipe(
      switchMap(post => this.call.get(`${BASE_API_URL}/users/${post.userId}`)),
      shareReplay(1)
    );

    this.comments$ = this.post$.pipe(
      switchMap(post => this.call.get(`${BASE_API_URL}/comments?postId=${post.id}`)),
      shareReplay(1)
    );
  }

  ToggleComments(){ this.isCommentShown.set(!this.isCommentShown()) }
}
