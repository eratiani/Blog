import { Component, OnInit } from '@angular/core';
import { ISortItem } from '../shared/dto/sort-item.model';
import { SorterService } from '../shared/service/sorter.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  soretedCategoriesId: number[] = [];

  categories: ISortItem[] = [];
  constructor(private sortService: SorterService) {}
  ngOnInit(): void {
    this.sortService
      .getCategories()
      .then((data) => (this.categories = [...data.data]));
  }
  onSort(event: Event) {
    const element = event.target as HTMLElement;
    const sorterID = element.getAttribute('data-id');
    if (!sorterID) return;
    element.classList.toggle('border');
    if (this.soretedCategoriesId.includes(+sorterID)) {
      this.soretedCategoriesId = [
        ...this.soretedCategoriesId.filter((id) => id !== +sorterID),
      ];
    } else {
      this.soretedCategoriesId.push(+sorterID);
    }
  }
}
