import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  @Input() bg = false;
  @Input() red: boolean | undefined = false;
  @HostBinding('style.background-color') backgroundColor = '';
  @HostBinding('style.border-color') textColor = '';
  first = true;
  ngOnChanges(): void {
    if (this.first) {
      this.first = false;
      return;
    }
    if (this.bg) {
      this.red
        ? ((this.textColor = '#EA1919'), (this.backgroundColor = '#FAF2F3'))
        : ((this.textColor = '#14D81C'), (this.backgroundColor = '#F8FFF8'));
    }
  }
}
