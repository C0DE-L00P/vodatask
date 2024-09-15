
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { BASE_API_URL } from '../../../environments/env';
import { PostComponent } from './post.component';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PostComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { id: '1' }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch post data on init', fakeAsync(() => {
    const mockPost = { id: 1, userId: 1, title: 'Test Post', body: 'Test Body' };
    
    component.ngOnInit();
    
    const req = httpMock.expectOne(`${BASE_API_URL}/posts/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPost);

    tick();

    component.post$.subscribe(post => {
      expect(post).toEqual(mockPost);
    });
  }));

  it('should fetch author data after fetching post', fakeAsync(() => {
    const mockPost:any = { id: 1, userId: 1, title: 'Test Post', body: 'Test Body' };
    const mockUser:any = { id: 1, name: 'Test User' };
    
    component.ngOnInit();
    
    const postReq = httpMock.expectOne(`${BASE_API_URL}/posts/1`);
    postReq.flush(mockPost);

    tick();

    const userReq = httpMock.expectOne(`${BASE_API_URL}/users/1`);
    expect(userReq.request.method).toBe('GET');
    userReq.flush(mockUser);

    tick();

    component.author$.subscribe(author => {
      expect(author).toEqual(mockUser);
    });
  }));

  it('should fetch comments data after fetching post', fakeAsync(() => {
    const mockPost = { id: 1, userId: 1, title: 'Test Post', body: 'Test Body' };
    const mockComments:any = [{ id: 1, postId: 1, body: 'Test Comment' }];
    
    component.ngOnInit();
    
    const postReq = httpMock.expectOne(`${BASE_API_URL}/posts/1`);
    postReq.flush(mockPost);

    tick();

    const commentsReq = httpMock.expectOne(`${BASE_API_URL}/comments?postId=1`);
    expect(commentsReq.request.method).toBe('GET');
    commentsReq.flush(mockComments);

    tick();

    component.comments$.subscribe(comments => {
      expect(comments).toEqual(mockComments);
    });
  }));
});
