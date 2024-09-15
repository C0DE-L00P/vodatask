import { AsyncPipe, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { BASE_API_URL } from '../../../environments/env';
import { Post } from '../../../types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, AsyncPipe, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private route:ActivatedRoute, private http:HttpClient){
    
  }

  posts$!: Observable<Post[]>;

  ngOnInit(){
    this.posts$ = this.http.get<Post[]>(BASE_API_URL+'/posts?_start=0&_limit=5');
  }

  getUniqueImageUrl(index: number): string {
    return `https://random.imagecdn.app/480/360?_=${index}`;
  }
}
