import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Pais} from '../../interfaces/pais.interface';
import { PaisV2 } from '../../interfaces/paisV2.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais!: PaisV2;
  
  
  constructor( 
      private activateRoute: ActivatedRoute,
      private paisService: PaisService) { }
  
  //En el onInit se define un observable para obtener el código (id) de la url
  //Dentro del observable, se crea un nuevo observable para cargar la información del pais
  //de acuerdo al ID obtenido previamente. Se ejecuta a traves del método correspondiente  
  //expuesto en el servicio país 
  //Se utiliza desestructuración de argumentos ({}) para obtener el parametro requerido
  ngOnInit(): void {
    
    //Modo 1: Esta es una manera de ejecutar un observable dentro de otro
    //this.activateRoute.params
    //  .subscribe( ({id}) => {
    //    console.log(id);
    //    this.paisService.getPaisxCodigo(id)
    //      .subscribe(pais => {
    //        console.log(pais);
    //      })
    //  })

    //Modo 2: Para ejecutar un observable dentro de otro utilizamos el operador switchMap de RXJS
    //este operador permite recibir un Observable y devolver uno diferente.
    //Se utiliza el operador Tap para disparar un efecto secundario que en este caso es mandar a consola
    //el resultado del operador anterior (switchMap)
    //Se utiliza desestructuración de argumentos ({}) para obtener el parametro requerido
    this.activateRoute.params
      .pipe(
        switchMap( ({id}) => this.paisService.getPaisxCodigo(id)),
        tap(console.log)
      )  
      .subscribe( pais => this.pais = pais);
  }

}
