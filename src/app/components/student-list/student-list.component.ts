import {
  Component,
  OnInit,
  DoCheck,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';
import { StudentCardComponent } from '../student-card/student-card.component';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, FormsModule, StudentCardComponent],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit, DoCheck, AfterViewInit, OnDestroy {
  // All students from service
  students: Student[] = [];

  // Bonus 1: Search box
  searchTerm: string = '';

  // Bonus 2: Course filter dropdown
  selectedCourse: string = 'All';

  availableCourses: string[] = ['All', 'Angular', 'React', 'Java', 'Python', 'Vue', 'Node.js'];

  private subscription: Subscription = new Subscription();
  private lastCheckedStudentCount = 0;

  // TASK 1 & 6: Inject StudentService into smart component
  constructor(private studentService: StudentService) {}

  // TASK 4: ngOnInit() - Load students from StudentService
  ngOnInit(): void {
    console.log('[StudentListComponent] ngOnInit(): Subscribing to StudentService for student data.');
    this.subscription.add(
      this.studentService.students$.subscribe((data) => {
        this.students = data;
        console.log(`[StudentListComponent] Received ${data.length} students from StudentService.`);
      })
    );
  }

  // TASK 4: ngDoCheck() - Log message when custom change checking runs
  ngDoCheck(): void {
    if (this.students.length !== this.lastCheckedStudentCount) {
      console.log(
        `[StudentListComponent] ngDoCheck(): Change detected in student list length! Previous: ${this.lastCheckedStudentCount}, New: ${this.students.length}`
      );
      this.lastCheckedStudentCount = this.students.length;
    }
  }

  // TASK 4: ngAfterViewInit() - Log message after view is initialized
  ngAfterViewInit(): void {
    console.log('[StudentListComponent] ngAfterViewInit(): Student list view initialization complete.');
  }

  // TASK 4: ngOnDestroy() - Log message and clean up when destroyed
  ngOnDestroy(): void {
    console.log('[StudentListComponent] ngOnDestroy(): Component destroyed, unsubscribing from service.');
    this.subscription.unsubscribe();
  }

  /**
   * Filtered students based on search term and course filter (Bonus 1 & 2)
   */
  get filteredStudents(): Student[] {
    return this.students.filter((student) => {
      const matchesName = student.name
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase().trim());

      const matchesCourse =
        this.selectedCourse === 'All' || student.course === this.selectedCourse;

      return matchesName && matchesCourse;
    });
  }

  /**
   * BONUS TASK 5: Total number of students
   */
  get totalStudentsCount(): number {
    return this.students.length;
  }

  get activeStudentsCount(): number {
    return this.students.filter((s) => s.status === 'Active').length;
  }

  get inactiveStudentsCount(): number {
    return this.students.filter((s) => s.status === 'Inactive').length;
  }

  /**
   * BONUS TASK 4: Delete student handler
   */
  onDeleteStudent(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id);
    }
  }

  trackByStudentId(index: number, student: Student): number {
    return student.id;
  }
}

