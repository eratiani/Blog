import { DatePipe } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ICardItem } from 'src/app/home/shared/dto/card-item.model';
import { ISortItem } from 'src/app/home/shared/dto/sort-item.model';
import { CardService } from 'src/app/home/shared/service/card.service';
import { SorterService } from 'src/app/home/shared/service/sorter.service';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { SucessModalComponent } from 'src/app/stand-alone/sucess-modal/sucess-modal.component';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css'],
})
export class CreateBlogComponent implements OnInit, OnDestroy {
  @Input() title: string | undefined;
  mockData!: ISortItem[];
  categoryData: ISortItem[] = [];
  image: string | undefined;
  imageName!: string | undefined;
  blogCreateForm!: FormGroup;
  @ViewChild('categoriesList', { static: false }) categoriesList:
    | ElementRef
    | undefined;
  isRotated: boolean = false;
  formLocalStorage: ICardItem = {
    id: 0,
    title: '',
    description: '',
    image: '',
    publish_date: '',
    categories: [],
    author: '',
  };
  subscriptions: Subscription[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private sorterService: SorterService,
    private cardService: CardService,
    private datePipe: DatePipe,
    private localStorageS: LocalStorageService,
    public matSuccess: MatDialog
  ) {
    sorterService
      .getCategories()
      .then((cat) => (this.mockData = [...cat.data]));
  }
  ngOnInit(): void {
    this.blogCreateForm = this.formBuilder.group({
      image: [null, [Validators.required]],
      author: [
        this.localStorageS.getItem('author') || null,
        [
          Validators.required,
          Validators.minLength(4),
          this.minTwoWordsValidator,
          this.georgianSymbolsValidator,
        ],
      ],
      title: [
        this.localStorageS.getItem('title') || null,
        [Validators.minLength(2), Validators.required],
      ],
      description: [
        this.localStorageS.getItem('description') || null,
        [Validators.minLength(4), Validators.required],
      ],
      publish_date: [
        this.localStorageS.getItem('publish_date') || null,
        [Validators.required],
      ],
      category: [
        this.localStorageS.getItem('category') || null,
        [Validators.required],
      ],
      email: [this.localStorageS.getItem('email') || null],
    });

    const emailControl = this.blogCreateForm.get('email');
    if (!emailControl) return;
    let firstTry = true;
    this.categoryData = this.localStorageS.getItem('category') || [];
    emailControl.valueChanges.subscribe((emailValue) => {
      if (!firstTry && emailValue.length === 0) {
        emailControl.setValidators(null);
        emailControl.updateValueAndValidity();
        return;
      } else if (!firstTry) {
        return;
      }
      if (emailValue && emailValue.trim() !== '') {
        firstTry = !firstTry;
        emailControl.setValue(emailValue, { emitEvent: false });
        emailControl.setValidators([
          Validators.required,
          Validators.pattern(/^[a-zA-Z]+@redberry\.ge$/),
        ]);
      }
      emailControl.updateValueAndValidity();
    });

    ///could not pre populate input type file with data from local storage
    // this.image = this.localStorageS.getItem('img') || null;
    this.imageName = this.localStorageS.getItem('imgName') || null;
    this.valueChangeSub('author');
    this.valueChangeSub('title');
    this.valueChangeSub('description');
    this.valueChangeSub('publish_date');

    this.valueChangeSub('email');
    this.triggerValidation();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
  triggerValidation() {
    Object.keys(this.blogCreateForm.controls).forEach((controlName) => {
      const control = this.blogCreateForm.get(controlName);
      console.log(control);

      if (control) {
        control.updateValueAndValidity();
      }
    });
  }
  valueChangeSub(title: string) {
    const sub = this.blogCreateForm
      .get(title)
      ?.valueChanges.subscribe((nevVal) => {
        this.localStorageS.setItem(title, nevVal);
      });
    if (sub) {
      this.subscriptions.push(sub);
    }
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
        const img = reader.result as string;
        const imgName = files[0].name;
        this.image = img;
        this.imageName = imgName;
        this.formLocalStorage.image = this.image;
        this.localStorageS.setItem('img', img);
        this.localStorageS.setItem('imgName', imgName);
      };
      reader.readAsDataURL(files[0]);
    }
  }
  removeImage() {
    this.blogCreateForm.get('image')?.reset();
    this.image = undefined;
    this.imageName = undefined;
    this.localStorageS.deleteItem('imgName');
    this.localStorageS.deleteItem('img');
  }

  async createBlog() {
    if (!this.blogCreateForm.valid) return;
    const image = this.converToBlob(this.image as string);
    const categories = this.categoryData.map((e) => e.id);
    const { title, description, publish_date, author, email } =
      this.blogCreateForm.value;
    const submitObj: any = {
      image: image,
      categories,
      title,
      description,
      publish_date,
      author,
    };
    if (email) {
      submitObj.email = email;
    }
    submitObj.categories = `[${categories.join(',')}]`;
    submitObj.publish_date = this.datePipe.transform(
      publish_date,
      'yyyy-MM-dd'
    );
    const imageFile = new File([submitObj.image], 'image.jpg', {
      type: 'image/jpeg',
    });
    const formData = new FormData();
    formData.append('author', submitObj.author);
    formData.append('categories', submitObj.categories);
    formData.append('description', submitObj.description);
    formData.append('image', submitObj.image, 'image.jpeg');
    formData.append('publish_date', submitObj.publish_date);
    formData.append('title', submitObj.title);
    formData.append('email', submitObj.email || '');
    this.cardService.addCard(formData);
    this.matSuccess.open(SucessModalComponent);
    this.localStorageS.deleteItem('category');
    this.localStorageS.deleteItem('author');
    this.localStorageS.deleteItem('description');
    this.localStorageS.deleteItem('title');
    this.localStorageS.deleteItem('publish_date');
    this.localStorageS.deleteItem('img');
    this.localStorageS.deleteItem('email');
    this.localStorageS.deleteItem('imgName');
  }

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
  converToBlob(imageData: string) {
    const byteCharacters = atob(imageData.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: 'image/jpeg' });
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
    const categoryInput = this.blogCreateForm.get('category');
    const dataId = clickedElement.getAttribute('data-id');
    if (!categoryInput) return;
    if (dataId !== null) {
      const categoryId = parseInt(dataId, 10);
      const category = this.mockData.filter(
        (data) => data.id === categoryId
      )[0];
      console.log(category);

      const clickedElement = event.target as HTMLElement;
      clickedElement.classList.toggle('green');
      const itemAddedInd = this.categoryData.findIndex(
        (el) => el.id === category.id
      );
      if (itemAddedInd !== -1) {
        this.categoryData.splice(itemAddedInd, 1);
        this.checkCategoryLength(categoryInput);
        this.localStorageS.setItem('category', this.categoryData);

        return;
      }
      this.categoryData.push(category);
      this.localStorageS.setItem('category', this.categoryData);
      this.checkCategoryLength(categoryInput);
    }
  }
  checkCategoryLength(input: any) {
    return this.categoryData.length > 0
      ? input.patchValue('lol')
      : input.patchValue('');
  }
  onOpenSelect() {
    if (this.categoriesList) {
      this.isRotated = !this.isRotated;
      this.categoriesList.nativeElement.classList.toggle('disNone');
    }
  }
  generateListItems(): string {
    return this.categoryData
      .map(
        (item) =>
          `<li class="category--selected--list--item" 
              style="background-color: ${item.background_color}; color: ${item.text_color}" 
              data-id="${item.id}">
              ${item.title}
           </li>`
      )
      .join('');
  }
  removeCategory(id: number) {
    const categoryInput = this.blogCreateForm.get('category');
    if (!categoryInput) return;
    this.categoryData = [...this.categoryData.filter((e) => e.id != id)];
    this.checkCategoryLength(categoryInput);
  }
}
