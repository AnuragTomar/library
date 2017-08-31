import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { AuthorService } from '../services/author.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {

  author = {};
  authors = [];
  isLoading = true;
  isEditing = false;

  addAuthorForm: FormGroup;
  name = new FormControl('', Validators.required);
  about = new FormControl('', Validators.required);
  bestseller = new FormControl('', Validators.required);

  constructor(private authorService: AuthorService,
              private formBuilder: FormBuilder,
              private http: Http,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getAuthors();
    this.addAuthorForm = this.formBuilder.group({
      name: this.name,
      about: this.about,
      bestseller: this.bestseller
    });
  }

  getAuthors() {
    this.authorService.getAuthors().subscribe(
      data => this.authors = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addAuthor() {
    this.authorService.addAuthor(this.addAuthorForm.value).subscribe(
      res => {
        const newAuthor = res.json();
        this.authors.push(newAuthor);
        this.addAuthorForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(author) {
    this.isEditing = true;
    this.author = author;
  }

  cancelEditing() {
    this.isEditing = false;
    this.author = {};
    this.toast.setMessage('item editing cancelled.', 'warning');
    this.getAuthors();
  }

  editAuthor(author) {
    this.authorService.editAuthor(author).subscribe(
      res => {
        this.isEditing = false;
        this.author = author;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteAuthor(author) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.authorService.deleteAuthor(author).subscribe(
        res => {
          const pos = this.authors.map(elem => elem._id).indexOf(author._id);
          this.authors.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }
}
