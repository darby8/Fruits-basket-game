import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDragable]',
})
export class DragableDirective {
  private isDragging = false;
  private trolleyElement=0
  private startPositionX = 0;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.listen(
      this.elementRef.nativeElement.parentElement,
      'mousedown',
      (event: MouseEvent) => {
        this.onMouseDown(event);
      }
    );
    this.renderer.listen(
      this.elementRef.nativeElement.parentElement,
      'touchstart',
      (event: MouseEvent) => {
        this.onMouseDown(event);
      }
    );
  }
  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  onMouseDown(event: MouseEvent | TouchEvent) {
    event.preventDefault();
    this.isDragging = true;
    this.startPositionX = this.getClientX(event);
  }
  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:touchmove', ['$event'])
  onMouseMove(event: MouseEvent | TouchEvent) {
    if (!this.isDragging) return;
    const currentX = this.getClientX(event);
    const element = this.elementRef.nativeElement;
    const parentElement = element.parentElement;
    const rect = element.getBoundingClientRect();
    const deltaX = currentX - rect.left;
    this.startPositionX = currentX;
    const newLeft = this.elementRef.nativeElement.offsetLeft + deltaX;
    const parentWidth = this.elementRef.nativeElement.parentElement.offsetWidth;
    const elementWidth = this.elementRef.nativeElement.offsetWidth;
    const maxLeft = parentWidth - elementWidth;
    const newLeftInRange = Math.max(0, Math.min(maxLeft, newLeft));
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'left',
      `${newLeftInRange}px`
    );
   
     
  }
  @HostListener('document:mouseup')
  @HostListener('document:touchend')
  onMouseUp() {
    this.isDragging = false;
    this.renderer.removeClass(document.body, 'disable-selection');
  }
  getClientX(event: MouseEvent | TouchEvent): number {
    return event instanceof MouseEvent
      ? event.clientX
      : event.touches[0].clientX;
  }
}
