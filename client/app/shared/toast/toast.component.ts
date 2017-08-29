import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  @Input() message = { body: '', type: '' };
  /*@Input()  it means we are getting input for message from some class. if there is input from other classs angular puts default values '','' as specified ({ body: '', type: '' };).*/
  
  setMessage(body, type, time = 3000) {
    this.message.body = body;
    this.message.type = type;
    setTimeout(() => { this.message.body = ''; }, time);
  }
  /*show the message till 3 seconds and then empty body hence omit the message displayed.it is used in adminComponent.ts/html.*/ 
}
