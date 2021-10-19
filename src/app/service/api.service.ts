import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient : HttpClient ) { }

  postTask(data :any){
    return this.httpClient.post<any>("http://localhost:3000/posts", data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getTask(){
    return this.httpClient.get("http://localhost:3000/posts")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  updatedTask(data:any, id: number){
    return this.httpClient.put<any>("http://localhost:3000/posts/"+id, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteTask(id:number){
    return this.httpClient.delete<any>("http://localhost:3000/posts/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
