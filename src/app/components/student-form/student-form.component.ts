import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent {
  // TASK 6: Presentational Component emits event when form is submitted
  @Output() addStudent = new EventEmitter<Omit<Student, 'id'>>();

  // Form model fields
  studentName: string = '';
  course: string = 'Angular';
  fees: number | null = null;
  status: 'Active' | 'Inactive' = 'Active';

  courses: string[] = ['Angular', 'React', 'Java', 'Python', 'Vue', 'Node.js'];

  onSubmit(form: NgForm): void {
    if (form.invalid || !this.studentName.trim() || !this.fees) {
      alert('Please fill out all required fields with valid values.');
      return;
    }

    const newStudentData: Omit<Student, 'id'> = {
      name: this.studentName.trim(),
      course: this.course,
      fees: Number(this.fees),
      status: this.status
    };

    // Emit event to smart parent component (AppComponent)
    this.addStudent.emit(newStudentData);

    // Reset form after emission
    this.studentName = '';
    this.course = 'Angular';
    this.fees = null;
    this.status = 'Active';
    form.resetForm({
      course: 'Angular',
      status: 'Active'
    });
  }
}

