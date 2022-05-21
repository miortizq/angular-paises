import { Component } from '@angular/core';
import { Pais } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li {
        cursor : pointer;
      }
    `
  ]
  
})
export class PorPaisComponent
{

  termino : string = '';
  hayError: boolean = false;
  listaPaises: Pais[] = [];
  //adiciona lista para almacenar los paises sugeridos
  listaPaisesSugeridos: Pais[] = [];
  //adiciona variable que determina si la lista de sugeridos se presenta(true) o no(false) en pantalla
  mostrarSugerencias: boolean = false;

  //Se inyecta el servicio PaisService para utilizar el metodo que consume la URL
  constructor( private paisService: PaisService) { 
  }

  //El argumento que recibe la función buscar (terminoEvento) es el enviado cuando se escucha
  //el evento onEnter en el html, resultado de diligenciar la caja en el pais-input
  buscarPais(terminoEvento: string)
  {
    this.hayError=false;
    this.termino = terminoEvento;
    this.mostrarSugerencias = false;

    //OJO .. para que se ejecute el consumo, debe existir un suscribe. 
    //suscribe maneja 3 argumentos: 
    //next-corresponde al registro encontrado, 
    //error-corresponde a la captura del error en el momento de la respuesta, 
    //complete-corresponde a la finalización de la operación
    this.paisService.buscarPais(this.termino)
    .subscribe( (paises) => {      
      this.listaPaises = paises; 
    }, (err) => {
      this.hayError=true;
      this.listaPaises = [];
    });
  }

  sugerencias( termino: string){
    
    this.mostrarSugerencias = true;
    this.hayError = false;
    this.termino =termino;

    //Implementa el llamado a buscar pais en el servicio y el resultado de la búsqueda se almacena
    //en la lista de sugeridos para ser presentada en la lista correspondiente en la pantalla 
    this.paisService.buscarPais(termino)
    .subscribe(paises => this.listaPaisesSugeridos = paises.splice(0,5),
    (err) => this.listaPaisesSugeridos = [])
  }
}
