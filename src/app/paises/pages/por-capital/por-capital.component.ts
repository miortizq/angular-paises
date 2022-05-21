import { Component } from '@angular/core';
import { Pais } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent {

  termino : string = '';
  hayError: boolean = false;
  listaPaises: Pais[] = [];

  //Se inyecta el servicio PaisService para utilizar el metodo que consume la URL
  constructor( private paisService: PaisService) { 
  }

  //El argumento que recibe la función buscar (terminoEvento) es el enviado cuando se escucha
  //el evento onEnter en el html, resultado de diligenciar la caja en el pais-input
  buscarPais(terminoEvento: string)
  {
    this.hayError=false;
    this.termino = terminoEvento;

    //OJO .. para que se ejecute el consumo, debe existir un suscribe. 
    //suscribe maneja 3 argumentos: 
    //next-corresponde al registro encontrado, 
    //error-corresponde a la captura del error en el momento de la respuesta, 
    //complete-corresponde a la finalización de la operación
    this.paisService.buscarPaisxCapital(this.termino)
    .subscribe( (paises) => {      
      this.listaPaises = paises;
    }, (err) => {
      this.hayError=true;
      this.listaPaises = [];
    });
  }

  sugerencias( termino: string){
    this.hayError = false;
  }

}
