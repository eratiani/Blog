import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ISortItem } from 'src/app/home/shared/dto/sort-item.model';
import { SorterService } from 'src/app/home/shared/service/sorter.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css'],
})
export class CreateBlogComponent implements OnInit {
  @Input() title: string | undefined;
  mockData!: ISortItem[];
  image: string | undefined;
  imageName!: string | undefined;
  blogCreateForm!: FormGroup;
  @ViewChild('categoriesList', { static: false }) categoriesList:
    | ElementRef
    | undefined;
  isRotated: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private sorterService: SorterService
  ) {
    this.mockData = [...sorterService.mockData];
  }
  ngOnInit(): void {
    this.blogCreateForm = this.formBuilder.group({
      image: [null, [Validators.required]],
      author: [
        null,
        [
          Validators.required,
          Validators.minLength(4),
          this.minTwoWordsValidator,
          this.georgianSymbolsValidator,
        ],
      ],
      title: [null, [Validators.minLength(2), Validators.required]],
      description: [null, [Validators.minLength(4), Validators.required]],
      submitDate: [null, [Validators.required]],
      category: [null, [Validators.required]],
      email: [null, [Validators.required]],
    });
  }
  onDragOver(event: Event) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.handleFile(event.dataTransfer!.files);
  }

  onFileSelected(event: any) {
    this.handleFile(event.target.files);
  }

  private handleFile(files: FileList) {
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        this.image = reader.result as string;
        this.imageName = files[0].name;
        console.log(this.image);
      };
      reader.readAsDataURL(files[0]);
    }
  }
  removeImage() {
    this.blogCreateForm.get('image')?.reset();
    this.image = undefined;
    this.imageName = undefined;
  }
  createBlog() {}
  minTwoWordsValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const value = control.value as string;

    if (value) {
      const words = value.split(' ').filter((word) => word.trim() !== '');
      if (words.length < 2) {
        return { minTwoWords: true };
      }
    }

    return null;
  }

  georgianSymbolsValidator(control: AbstractControl) {
    const georgianPattern = /^[\u10A0-\u10FF\s]+$/;

    if (control.value && !georgianPattern.test(control.value)) {
      return { georgianSymbols: true };
    }

    return null;
  }
  checkForInvalid(formElement: string): boolean | undefined {
    return (
      this.blogCreateForm.get(`${formElement}`)?.invalid &&
      (this.blogCreateForm.get(`${formElement}`)?.dirty ||
        this.blogCreateForm.get(`${formElement}`)?.touched)
    );
  }
  checkForEmpty(control: AbstractControl) {
    if (control.value && control.value.length <= 0) {
      return { empty: true };
    }
    return null;
  }
  checkForError(formElement: string, error: string): boolean | undefined {
    return this.blogCreateForm.get(`${formElement}`)?.hasError(`${error}`);
  }
  redOrGreenColor(
    formElement: string,
    error: string,
    errorReq: string = 'required'
  ) {
    return this.checkForError(`${formElement}`, `${error}`) ||
      this.checkForError(`${formElement}`, `${errorReq}`)
      ? this.blogCreateForm.get(`${formElement}`)?.dirty ||
        this.blogCreateForm.get(`${formElement}`)?.touched
        ? '#EA1919'
        : ''
      : this.blogCreateForm.get(`${formElement}`)?.dirty ||
        this.blogCreateForm.get(`${formElement}`)?.touched
      ? '#14D81C'
      : '';
  }
  onAddCategory(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;

    const dataId = clickedElement.getAttribute('data-id');

    if (dataId !== null) {
      const categoryId = parseInt(dataId, 10);
      const category = this.mockData.filter(
        (data) => data.id === categoryId
      )[0];
      const clickedElement = event.target as HTMLElement;
      clickedElement.classList.toggle('green');
    }
  }
  onOpenSelect() {
    if (this.categoriesList) {
      this.isRotated = !this.isRotated;
      this.categoriesList.nativeElement.classList.toggle('disNone');
    }
  }
}
