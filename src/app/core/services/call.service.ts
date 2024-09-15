import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CallService {
    constructor(private http:HttpClient){}
    private cache = new Map<string, any>();

    getCached(key:string):Observable<any> | null{
        return this.cache.has(key)? of(this.cache.get(key)):null;
    }

    setCache(key:string, value:any):void{
        this.cache.set(key,value);
    }

    get(url:string) : Observable<any>{
        const cachedResponse = this.getCached(url);
        
        return cachedResponse
        ? cachedResponse
        : this.http.get(url).pipe(tap(res=> this.setCache(url, res)))
    }
}