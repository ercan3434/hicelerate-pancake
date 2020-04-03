import { Component, OnInit } from '@angular/core';
import { CourseService } from './course.service';
import { Course } from './course';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  providers: [CourseService]
})
export class CourseComponent implements OnInit {

  courses:Course[];
  courseEdit:Course;
  localDB:Course;

  isVisible = false;

  constructor(private courseService:CourseService) {
    this.courseEdit=new Course();
   }

  ngOnInit() {
    this.getCourses();
  }

    getCourses() {
        this.courseService.getCourses().subscribe(data=>{
          this.courses=data;
        })
      }

    showModal(): void {
      this.isVisible = true;
    }
  
    handleOk(): void {
      console.log('Button ok clicked!');
      this.isVisible = false;
    }
  
    handleCancel(form?: NgForm): void {
      console.log('Button cancel clicked!');
      this.isVisible = false;
      this.localDB= JSON.parse(localStorage.getItem("course"));
      if(this.courseEdit.description!== this.localDB.description && 
        this.courseEdit.participant!== this.localDB.participant){
        form.reset();
      }
      this.courseEdit.description=this.localDB.description;
      this.courseEdit.participant=this.localDB.participant;
    }

    editCourse(courses: Course) {
      this.courseEdit = courses;
      localStorage.setItem("course",JSON.stringify(this.courseEdit));
    }

}
