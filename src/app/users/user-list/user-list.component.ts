import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/commons/model/user';
import { UserService } from '../../services/user.service';
import swal from 'sweetalert2';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  mensaje: string;
  error: string;
  id: string;
  users: User[];
  constructor(
    private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.handleUserListComponent();
  }

  handleUserListComponent(){this.userService.getAllUsers().subscribe(this.processUsers()) }

 
  deleteUser(user: User): void{
    this.userService.deleteUser(user.id)
      .subscribe(a =>{
        swal.fire('Cliente Eliminado', 'Cliente Eliminado con exito!', 'success');
        this.removeUser(user);
      });
  }

  processUsers() {
    return data => {
      console.log('data -> ', data);
      this.users = data['users'];
      console.log('this.users -> ', this.users);  
    
    }
  };


  removeUser(user: User): void {
    this.users = this.users.filter(({ id }) => id !== user.id);        
  }

  
}
