import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const API = environment.apiUrl + '/user-entities';


@Injectable({
  providedIn: 'root',
})
export class UserEntityService {
  constructor(private http: HttpClient) {}

  getAllUserEntities(): Observable<any[]> {
    return this.http.get<any[]>(API);
  }

  getUserEntityById(id: number): Observable<any> {
    return this.http.get<any>(`${API}/${id}`);
  }

  createUserEntity(data: any): Observable<any> {
    return this.http.post(API, data);
  }

  update(id: number, data: any) {
    return this.http.put(`${API}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${API}/${id}`);
  }   
}

