import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://olympus.arvispace.com/Products/products2.php'; 

  constructor(private http: HttpClient) { }

  /*getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCategory(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }*/

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?action=getProducts`);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?action=getCategories`);
  }
  
}

