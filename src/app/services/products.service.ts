import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';



import { Product, createProductDTO, updateProductDTO } from './../models/product.model';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl:string = 'https://young-sands-07814.herokuapp.com/api/products';

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts() {
    return this.http.get<Product[]>(this.apiUrl)
    .pipe(
      map(products => products.map(item=>{
        return{
          ...item,
          taxes: .19* item.price
        }
      }))
    )
  }

  getProduct(id:string){
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === HttpStatusCode.Conflict){

          return throwError('Algo esta fallando en el servicio')
        }
        if(error.status === HttpStatusCode.NotFound){

          return throwError('No existe el producto')
        }
        if(error.status === HttpStatusCode.Unauthorized){

          return throwError('no estas autorizado')
        }
        return throwError('Error algo salio mal')
      })
    )
  }

  getProductsByPage(limit:number, offset:number){
    return this.http.get<Product[]>(`${this.apiUrl}`,{
      params: {limit, offset}
    })
  }

  create(data: createProductDTO){
    return this.http.post<Product>(this.apiUrl,data)
  }

  update(id:string, dto:updateProductDTO){
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto)
  }

  delete(id:string){
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`)
  }

}
