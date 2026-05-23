import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const API = environment.apiUrl + '/users';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(API);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${API}/${id}`);
  }

  createUser(data: any): Observable<any> {
    return this.http.post(API, data);
  }

  update(id: number, data: any) {
    return this.http.put(`${API}/${id}`, data);
  } 

  delete(id: number) {
    return this.http.delete(`${API}/${id}`);
  }
}
