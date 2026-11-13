import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Student } from '../../models/student.model';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { CurrencyFormatPipe } from '../../pipes/currency-format.pipe';
import { HighlightDirective } from '../../directives/highlight.directive';

@Component({
  selector: 'app-student-card',
  standalone: true,
  imports: [CommonModule, CapitalizePipe, CurrencyFormatPipe, HighlightDirective],
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.css']
})
export class StudentCardComponent implements OnChanges, AfterViewInit, OnDestroy {
  // Presentational Component receives student data via @Input()
  @Input() student!: Student;

  // Bonus Task 4: Delete button emission
  @Output() deleteStudent = new EventEmitter<number>();

  // TASK 4: ngOnChanges() - Detect changes to student data received through input
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['student']) {
      const current = changes['student'].currentValue;
      const previous = changes['student'].previousValue;
      console.log(
        `[StudentCardComponent] ngOnChanges(): Student input updated. Current: ${current?.name}, Previous: ${previous?.name ?? 'Initial load'}`
      );
    }
  }

  // TASK 4: ngAfterViewInit() - Log a message after the component's view is initialized
  ngAfterViewInit(): void {
    console.log(`[StudentCardComponent] ngAfterViewInit(): Card view initialized for Student ID ${this.student?.id}`);
  }

  // TASK 4: ngOnDestroy() - Log a message when the component is destroyed
  ngOnDestroy(): void {
    console.log(`[StudentCardComponent] ngOnDestroy(): Student card destroyed for ${this.student?.name} (ID: ${this.student?.id})`);
  }

  onDelete(): void {
    if (this.student) {
      this.deleteStudent.emit(this.student.id);
    }
  }
}

