import {
  Directive,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  HostListener,
} from "@angular/core";

@Directive({
  selector: "[clickedOutside]",
})
export class ClickedOutsideDirective {
  @Output() clickedOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {}

  @HostListener("document:click", ["$event.target"])
  public onClick(target) {
    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside) {
      this.clickedOutside.emit();
    }
  }
}
