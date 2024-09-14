import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
// TODO implement typescript @root import
import { RouterLink } from '@angular/router';
import { BASE_API_URL } from '../../../../environments/env';
import { User } from './../../../../types.d';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports:[AsyncPipe, JsonPipe, NgIf, NgFor, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})

export class LayoutComponent {
  users$!:Observable<User[]>;
  constructor(private http:HttpClient){}

  ngOnInit(){
    this.users$ = this.http.get<User[]>(BASE_API_URL+'/users');
  }
  //TODO optional: add trackby function
}
