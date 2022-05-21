import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Pais } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl: string = 'https://restcountries.com/v3.1';
  private apiUrlV2: string = 'https://restcountries.com/v2';

  constructor(private http: HttpClient) { }

  //Para generalizar la carga de parámetros comunes a las URL creamos un get
  //con la de definicón de los parámetros
  getParams(){
    //Se pueden definir parametros a la URl. Se utiliza el onjeto HttpParams y se especifican todos los
    //parámetros necesarios
    return new HttpParams().set('fields','flags;name;capital;population;cca2');
  };

  buscarPais(termino: string):Observable<Pais[]> {

    //Se construye la URL tomando la url base que se encuentra en la variable apiUrl y se concatena
    //el resto de la url y el valor que entra como parámetro (termino)
    const url: string = `${this.apiUrl}/name/${termino}`;

    //Se podría ejecutar el consumo de la url utilizando el .suscribe por ser un observable pero no se
    //pretende que la respuesta quede en el servicio, por lo tanto, se efectua un retorno del consumo
    //al lugar desde donde fue llamado y para esto se debe especificar el tipo de retorno de la 
    //función que para este efecto es Observable
    //return this.http.get<Pais[]>(url, {params : this.getParams() });
    return this.http.get<Pais[]>(url);

  }

  buscarPaisxCapital(termino: string):Observable<Pais[]> {

    //Se construye la URL tomando la url base que se encuentra en la variable apiUrl y se concatena
    //el resto de la url y el valor que entra como parámetro (termino)
    const url: string = `${this.apiUrl}/capital/${termino}`;

    //Se podría ejecutar el consumo de la url utilizando el .suscribe por ser un observable pero no se
    //pretende que la respuesta quede en el servicio, por lo tanto, se efectua un retorno del consumo
    //al lugar desde donde fue llamado y para esto se debe especificar el tipo de retorno de la 
    //función que para este efecto es Observable
    return this.http.get<Pais[]>(url);

  }

  getPaisxCodigo(id: string):Observable<Pais> {

    //Se construye la URL tomando la url base que se encuentra en la variable apiUrl y se concatena
    //el resto de la url y el valor que entra como parámetro (termino)
    const url: string = `${this.apiUrlV2}/alpha/${id}`;

    //Se podría ejecutar el consumo de la url utilizando el .suscribe por ser un observable pero no se
    //pretende que la respuesta quede en el servicio, por lo tanto, se efectua un retorno del consumo
    //al lugar desde donde fue llamado y para esto se debe especificar el tipo de retorno de la 
    //función que para este efecto es Observable
    return this.http.get<Pais>(url);

  }

  buscarPaisxRegion(region: string):Observable<Pais[]> {

    //Se construye la URL tomando la url base que se encuentra en la variable apiUrl y se concatena
    //el resto de la url y el valor que entra como parámetro (region)
    const url: string = `${this.apiUrl}/region/${region}`;

    //Se podría ejecutar el consumo de la url utilizando el .suscribe por ser un observable pero no se
    //pretende que la respuesta quede en el servicio, por lo tanto, se efectua un retorno del consumo
    //al lugar desde donde fue llamado y para esto se debe especificar el tipo de retorno de la 
    //función que para este efecto es Observable
    return this.http.get<Pais[]>(url);

  }
}
