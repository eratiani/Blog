import { Component, OnInit } from '@angular/core';
import { SorterService } from '../shared/service/sorter.service';
import { ISortItem } from '../shared/dto/sort-item.model';

@Component({
  selector: 'app-sorter',
  templateUrl: './sorter.component.html',
  styleUrls: ['./sorter.component.css'],
})
export class SorterComponent implements OnInit {
  sorterItems: ISortItem[] = [];
  constructor(private sorterService: SorterService) {}
  ngOnInit(): void {
    this.sorterItems = this.sorterService.mockData;
  }
}
