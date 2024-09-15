import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { BASE_API_URL } from '../../../environments/env';
import { Post } from '../../../types';
import { TruncatePipe } from '../../shared/pipes/truncate.pipe';
import { CallService } from './../../core/services/call.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, AsyncPipe, RouterLink, NgIf, TruncatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private route:ActivatedRoute, private call:CallService){}

  posts$!: Observable<Post[]>;
  routeSubscription:any;
  userId?:string;

  ngOnInit(){
    this.routeSubscription = this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
      this.posts$ = this.call.get(BASE_API_URL+'/posts?_start=0&_limit=10'+ (this.userId? '&userId='+this.userId:'') );
    });

    // this.posts$ = this.http.get<Post[]>(BASE_API_URL+'/posts?_start=0&_limit=10'+ (userId? '&userId='+userId:'') );
  }

  getUniqueImageUrl(index: number): string {
    return `https://random.imagecdn.app/480/360?_=${index}`;
  }

  ngOnDestroy(){
    this.routeSubscription.unsubscribe();
  }
}
