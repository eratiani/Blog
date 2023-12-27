import { Component, OnInit } from '@angular/core';
import { ISortItem } from '../shared/dto/sort-item.model';
import { SorterService } from '../shared/service/sorter.service';
import { CardService } from '../shared/service/card.service';
import { ICardItem } from '../shared/dto/card-item.model';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  soretedCategoriesId: number[] = [];

  categories: ISortItem[] = [];
  constructor(
    private sortService: SorterService,
    private cardService: CardService
  ) {}
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

    this.updateCards();
  }
  filterCards(cardItem: ICardItem[], soretedCategoriesId: number[]) {
    return soretedCategoriesId.length === 0
      ? cardItem
      : [
          ...cardItem.filter((cardItem) =>
            cardItem.categories.some((category) => {
              const isIncluded = soretedCategoriesId.includes(category.id);
              return isIncluded;
            })
          ),
        ];
  }
  private updateCards(): void {
    this.cardService.getCards().then((res) => {
      this.cardService.cards.next(
        this.filterCards(res.data, this.soretedCategoriesId)
      );
    });
  }
}
