import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Course} from './course';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient, @Inject('apiUrl') private apiUrl) {}

    getCourses(): Observable<Course[]> {
        return this.http.get<Course[]>(this.apiUrl)
      }
    
}
