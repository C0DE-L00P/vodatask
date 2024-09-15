import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'posts/:id',
        loadComponent: ()=> import('./pages/post/post.component').then(c=> c.PostComponent),
    },
    {
        path: '',
        loadComponent: ()=> import('./pages/home/home.component').then(c=> c.HomeComponent),
    },
];
