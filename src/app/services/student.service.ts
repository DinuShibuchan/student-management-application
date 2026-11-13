import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  // Initial sample student data
  private students: Student[] = [
    { id: 1, name: 'A', course: 'Angular', fees: 5000, status: 'Active' },
    { id: 2, name: 'B', course: 'React', fees: 4000, status: 'Active' },
    { id: 3, name: 'C', course: 'Java', fees: 3000, status: 'Inactive' }
  ];

  // BehaviorSubject to emit reactive updates without page refresh
  private studentsSubject = new BehaviorSubject<Student[]>([...this.students]);
  public students$: Observable<Student[]> = this.studentsSubject.asObservable();

  constructor() {}

  /**
   * Returns all students from the store
   */
  getStudents(): Student[] {
    return [...this.students];
  }

  /**
   * Adds a new student and notifies subscribers
   */
  addStudent(studentData: Omit<Student, 'id'> | Student): Student {
    const nextId = this.students.length > 0 
      ? Math.max(...this.students.map(s => s.id)) + 1 
      : 1;

    const newStudent: Student = {
      id: 'id' in studentData && studentData.id ? studentData.id : nextId,
      name: studentData.name,
      course: studentData.course,
      fees: Number(studentData.fees),
      status: studentData.status
    };

    this.students.push(newStudent);
    this.studentsSubject.next([...this.students]);
    return newStudent;
  }

  /**
   * Deletes a student by ID (Bonus Task 4)
   */
  deleteStudent(id: number): void {
    this.students = this.students.filter(student => student.id !== id);
    this.studentsSubject.next([...this.students]);
  }
}

