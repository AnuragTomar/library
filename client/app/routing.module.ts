import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//we use routerlink in html template files, we get that method in routerModule

import { AppComponent } from './app.component';
import { CatsComponent } from './cats/cats.component';
import { AuthorsComponent } from './authors/authors.component';
import { AboutComponent } from './about/about.component';
import { BooksComponent } from './books/books.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CommentsComponent } from './comments/comments.component';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';

const routes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'cats', component: CatsComponent },
  { path: 'authors', component: AuthorsComponent},
  { path: 'books', component: BooksComponent},
  { path: 'comments', component: CommentsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuardLogin] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardAdmin] },
  { path: 'notfound', component: NotFoundComponent },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class RoutingModule {}

/*Routes contains the paths and components and is passed to forRoot() which return ModulesWithProviders. and is imported in root module app.module*/