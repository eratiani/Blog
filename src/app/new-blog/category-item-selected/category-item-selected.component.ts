import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-category-item-selected',
  templateUrl: './category-item-selected.component.html',
  styleUrls: ['./category-item-selected.component.css'],
})
export class CategoryItemSelectedComponent {
  @Input() id!: number;
  @Input() title!: string;
  @Input() background_color!: string;
  @Input() text_color!: string;
  @Output() deleteClicked = new EventEmitter<number>();
  onRemoveCategory(event: Event) {
    event.stopImmediatePropagation();
    this.deleteClicked.emit(this.id);
  }
}
