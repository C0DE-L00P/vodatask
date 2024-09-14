import { AsyncPipe, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { BASE_API_URL } from '../../../environments/env';
import { Post, User } from '../../../types';
import { TruncatePipe } from '../../shared/pipes/truncate.pipe';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [AsyncPipe, NgIf, TruncatePipe, RouterLink],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  constructor(private route:ActivatedRoute, private http:HttpClient){}
  
  post$!:Observable<Post>;
  author$!:Observable<User>;
  
  ngOnInit(){
    const {id} = this.route.snapshot.params;
    
    this.post$ = this.http.get<Post>(BASE_API_URL+'/posts?userId='+id);

    //TODO handle this in a better way and watch out for memory leak
    this.post$.subscribe(data=> {
      this.author$ = this.http.get<User>(BASE_API_URL+'/users/'+data.userId);
    })
    
  }
}
