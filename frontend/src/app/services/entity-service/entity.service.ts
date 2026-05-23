import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const API = environment.apiUrl + '/entities';

@Injectable({
  providedIn: 'root',
})
export class EntityService {
  constructor(private http: HttpClient) {}
  
  getAllEntities(): Observable<any[]> {
    return this.http.get<any[]>(API);
  }

  getEntityById(id: number): Observable<any> {
    return this.http.get<any>(`${API}/${id}`);
  }

  createEntity(data: any): Observable<any> {
    return this.http.post(API, data);
  }

  update(id: number, data: any) {
    return this.http.put(`${API}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${API}/${id}`);
  } 
}
