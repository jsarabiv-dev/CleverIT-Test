import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// LIBRERIAS
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';

// COMPONENTES
import { AppComponent } from './app.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';

// SERVICIOS
import { UserService } from './services/user.service';



const routes: Routes = [
  {path: 'home', component: UserListComponent},
  {path: 'edit', component: UserEditComponent},
  {path: 'edit/:id', component: UserEditComponent},
  {path: '**', redirectTo: 'home', pathMatch: 'full'},

  
];


@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserEditComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
