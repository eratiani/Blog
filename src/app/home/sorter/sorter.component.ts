import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { SorterService } from '../shared/service/sorter.service';
import { ISortItem } from '../shared/dto/sort-item.model';
import { LocalStorageService } from 'src/app/shared/local-storage.service';

@Component({
  selector: 'app-sorter',
  templateUrl: './sorter.component.html',
  styleUrls: ['./sorter.component.css'],
})
export class SorterComponent implements OnInit {
  sorterItems: ISortItem[] = [];
  sorterItemsId: number[] = [];
  constructor(
    private sorterService: SorterService,
    private localStorageS: LocalStorageService
  ) {}
  ngOnInit(): void {
    this.sorterService
      .getCategories()
      .then((res) => (this.sorterItems = [...res.data]));
    this.sorterItemsId = this.localStorageS.getItem('categoryId') || [];
  }
  isItemSelected(itemId: number): boolean {
    return this.sorterItemsId.includes(itemId);
  }
}
