import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PromotionCode } from '../promotion-code/promotion-code';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl + 'promotion-code';

@Injectable({
  providedIn: 'root'
})
export class PromotionCodeService {

  constructor(private http: HttpClient) { }

  getAll(option:any): Observable<any> {
     let params = new HttpParams();
     params = params.append("page",option.page);
     params = params.append("limit",option.limit);

     if(option.promotionCode){
       params = params.append("search",option.promotionCode);
     }

     if(option.status){
      params = params.append("status",option.status);
    }

    return this.http.get(baseUrl , {params});
  }
 
  create(data:PromotionCode): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id:string, data:PromotionCode): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id:string): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
 
}