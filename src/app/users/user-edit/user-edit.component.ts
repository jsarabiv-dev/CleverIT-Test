import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/commons/model/user';
import { UserService } from 'src/app/services/user.service';
// import {NgForm} from '@angular/forms';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User = new User();
  isEdit: boolean;


  isTrue: boolean = false;
  constructor(private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    if (this.user.id == undefined) {
      console.log("this.user.id -> " + this.user.id)

      this.isEdit = true;
      console.log("isEdit -> " + this.isEdit)
    }

    this.cargarUser();


  }

  cargarUser(): void {
    console.log("Quiere crear mi pana");
    this.activatedRoute.params.subscribe(
      params => {
        
        let id = params['id']

        if (id) {
          this.isEdit = false;
          this.userService.findUser(id).subscribe(
            data => {
              this.user = data['user'];
              console.log("User encontrado: ")
              console.log(this.user);
            });
        }
      });
  }


  createUser(): void {
    console.log("Quiere crear mi pana");
    this.userService.createUsers(this.user)
      .subscribe(
        user => {
          swal.fire('Cliente Creado', `Cliente ${this.user.nombre} creado con exito!`, 'success');
          this.router.navigate(['/home'])
        }
      );
  }

  editUser(): void {
    this.userService.editUser(this.user)
      .subscribe(
        user => {
          swal.fire('Cliente Actualizado', `Cliente ${this.user.nombre} actualizado con exito!`, 'success');
          this.router.navigate(['/home'])
        }
      );
  }

}
