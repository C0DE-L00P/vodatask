import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Post } from '../../../../types';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'post-card',
  standalone: true,
  imports: [RouterLink, TruncatePipe],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss'
})
export class PostCardComponent {
  route = inject(ActivatedRoute);
  @Input() post!:Post;
}
