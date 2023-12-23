import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css'],
})
export class CreateBlogComponent {
  @Input() title: string | undefined;
  image: string | undefined;
  imageName!: string | undefined;
  onDragOver(event: Event) {
    event.preventDefault();
  }

  onDrop(event: any) {
    event.preventDefault();
    this.handleFile(event.dataTransfer.files);
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
    const inputElement = document.getElementById(
      'img--input'
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.value = '';
    }
    this.image = undefined;
    this.imageName = undefined;
  }
}
