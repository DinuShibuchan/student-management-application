import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective implements OnInit {
  /**
   * Input property to check if the student is active.
   * Can accept boolean (true) or status string ('Active').
   */
  @Input('appHighlight') isActive: boolean | string = true;

  private originalBackground: string = '';

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    // Record original background color on init
    this.originalBackground = this.el.nativeElement.style.backgroundColor || '';
  }

  /**
   * Helper to determine if highlighting should apply
   */
  private shouldHighlight(): boolean {
    if (typeof this.isActive === 'boolean') {
      return this.isActive;
    }
    return this.isActive === 'Active' || this.isActive === '';
  }

  /**
   * When mouse enters an active student's card, change background to yellow
   */
  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.shouldHighlight()) {
      this.originalBackground = this.el.nativeElement.style.backgroundColor;
      this.el.nativeElement.style.backgroundColor = 'yellow';
      this.el.nativeElement.style.transition = 'background-color 0.3s ease';
    }
  }

  /**
   * When mouse leaves the card, restore original background
   */
  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.shouldHighlight()) {
      this.el.nativeElement.style.backgroundColor = this.originalBackground;
    }
  }
}

