import {
  Directive,
  Injectable,
  Input,
  EventEmitter,
  Output,
  ElementRef,
  HostListener,
} from "@angular/core";

@Directive({
  selector: "[scroll-spy]",
})
export class ScrollSpyDirective {
  @Output() public scrollChange = new EventEmitter<string>();

  constructor(private _el: ElementRef) {}

  @HostListener("window:scroll", ["$event.target"])
  onScroll(event: any) {
    // console.log(event.scrollingElement.scrollTop, event.scrollingElement.offsetTop);

    if (event.scrollingElement.scrollTop > 100) {
      this.scrollChange.emit("ShowBackToTop");
    }

    // let currentSection: string;
    // const children = this._el.nativeElement.children;
    // const scrollTop = event.target.scrollTop;
    // const parentOffset = event.target.offsetTop;
    // for (let i = 0; i < children.length; i++) {
    //     const element = children[i];
    //     if (this.spiedTags.some(spiedTag => spiedTag === element.tagName)) {
    //         if ((element.offsetTop - parentOffset) <= scrollTop) {
    //             currentSection = element.id;
    //         }
    //     }
    // }
    // if (currentSection !== this.currentSection) {
    //     this.currentSection = currentSection;
    //     this.sectionChange.emit(this.currentSection);
    // }
  }
}
