import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentService } from './services/student.service';
import { Student } from './models/student.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, StudentFormComponent, StudentListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Student Management Application';

  // Injects StudentService to coordinate adding new students
  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    console.log('[AppComponent] ngOnInit(): Root Application component initialized.');
  }

  ngAfterViewInit(): void {
    console.log('[AppComponent] ngAfterViewInit(): Root component view initialized.');
  }

  /**
   * Receives emitted student data from StudentFormComponent
   * and delegates persistence to StudentService.
   */
  onAddStudent(studentData: Omit<Student, 'id'>): void {
    console.log('[AppComponent] onAddStudent() received from form:', studentData);
    const addedStudent = this.studentService.addStudent(studentData);
    console.log(`[AppComponent] Successfully added student with ID: ${addedStudent.id}`);
  }
}

