import { Component, OnInit } from '@angular/core';

import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  users = [];
  isLoading = true;

  constructor(public auth: AuthService,
              public toast: ToastComponent,
              private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
    /*on initialize call getUser(), subscribe to observable in userService and map data returned into json, this data is loaded into user[] defined earlier by callback method data of below getUser(). */
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      data => this.users = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }
  /*this getUsers() calls and execute getUsers Observable present in user.service file.subscribe is what executes the observable, it takes 3 callback parameters(success, failure, completete) which are data, error, () in above method.in success callback we assign result to some variable, error cb is for error, complete callback is called after success or failure callback.
  forEach(),toArray() can be used to execute observable but they can't be used to cancel the subscription for that we only need subscribe(). 
  Map returns observable which can be subsribed to, subscribe returns unsubcribable observable.Map will be usefull if we want to manipulate data events and return subscribable observable which can be used by any other code.*/

  deleteUser(user) {
    this.userService.deleteUser(user).subscribe(
      data => this.toast.setMessage('user deleted successfully.', 'success'),
      error => console.log(error),
      () => this.getUsers()
    );
  }

}
