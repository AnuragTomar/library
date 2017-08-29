import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  @Input() condition: boolean;

  /*it is used in admincomponentts/html using in ts file we change the isLoading to true or false based on data loaded in array through subscription which is then assigned to condition. and in html template we use selector 'app-loading' */
}
