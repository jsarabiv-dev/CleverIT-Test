import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, switchAll} from 'rxjs/operators';
import { Observable,throwError } from 'rxjs';
import swal from 'sweetalert2';
import { User } from '../commons/model/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

   // Urls deben ser cargadas de forma dinamica
   URLs: any = {
    urlBase: 'http://localhost:8080/user',
    getAll: '/get-all',
    findUser: '/find/',
    createUser: '/create',
    editUser: '/edit',
    deleteUser: '/delete/',
  };

  constructor(
    private httpClient: HttpClient,
    private router: Router  ) { }


  getAllUsers(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.URLs['urlBase']+this.URLs['getAll']).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        this.router.navigate(['/home']);
        return throwError(e);
      })
    );
    
  }

  editUser(user: User): Observable<User> {
    return this.httpClient.put<User>(this.URLs['urlBase']+this.URLs['editUser'], user).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire('Error al editar usuario', e.error.error, 'error');
        this.router.navigate(['/home']);
        return throwError(e);
      })
    );
  }

  deleteUser(id: string): Observable<any> {
    return this.httpClient.delete<any>(this.URLs['urlBase']+this.URLs['deleteUser']+id).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire('Error al eliminar usuario', e.error.error, 'error');
        this.router.navigate(['/home']);
        return throwError(e);
      })
    );
  }

  findUser(id: String): Observable<any> {
    return this.httpClient.get<any>(this.URLs['urlBase']+this.URLs['findUser']+id).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        this.router.navigate(['/home']);
        return throwError(e);
      })
    );
  }

  createUsers(user: User): Observable<User> {
    return this.httpClient.post<User>(this.URLs['urlBase']+this.URLs['createUser'], user).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        this.router.navigate(['/home']);
        return throwError(e);
        
      })
    );
  }

 

}
