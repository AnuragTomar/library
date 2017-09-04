import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { CommentService } from '../services/comment.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  comment = {};
  comments = [];
  isLoading = true;
  isEditing = false;

  addCommentForm: FormGroup;
  user = new FormControl('', Validators.required);
  fav_part = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  comment_date = new FormControl('',Validators.required);
  
  constructor(private commentService: CommentService,
              private formBuilder: FormBuilder,
              private http: Http,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getComments();
    this.addCommentForm = this.formBuilder.group({
      user: this.user,
     fav_part:this.fav_part,
     description: this.description,
     comment_date: this.comment_date
    });
  }

  getComments() {
    this.commentService.getComments().subscribe(
      data => this.comments = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addComment() {
    this.commentService.addComment(this.addCommentForm.value).subscribe(
      res => {
        const newcomment = res.json();
        this.comments.push(newcomment);
        this.addCommentForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(comment) {
    this.isEditing = true;
    this.comment = comment;
  }

  cancelEditing() {
    this.isEditing = false;
    this.comment = {};
    this.toast.setMessage('item editing cancelled.', 'warning');
    this.getComments();
  }

  editComment(comment) {
    this.commentService.editComment(comment).subscribe(
      res => {
        this.isEditing = false;
        this.comment = comment;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteComment(comment) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.commentService.deleteComment(comment).subscribe(
        res => {
          const pos = this.comments.map(elem => elem._id).indexOf(comment._id);
          this.comments.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }
}
