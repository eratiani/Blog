import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css'],
})
export class CreateBlogComponent implements OnInit {
  @Input() title: string | undefined;
  image: string | undefined;
  imageName!: string | undefined;
  blogCreateForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.blogCreateForm = this.formBuilder.group({
      image: [null, [Validators.required]],
      author: [null, [Validators.required]],
      title: [null, [Validators.minLength(8), Validators.required]],
      description: [null, [Validators.minLength(8), Validators.required]],
      submitDate: [null, [Validators.minLength(8), Validators.required]],
      category: [null, [Validators.minLength(8), Validators.required]],
      email: [null, [Validators.minLength(8), Validators.required]],
    });
  }
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
    this.blogCreateForm.get('image')?.reset();
    this.image = undefined;
    this.imageName = undefined;
  }
  createBlog() {}
}
