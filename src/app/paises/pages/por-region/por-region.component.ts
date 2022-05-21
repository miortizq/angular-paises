import { Component } from '@angular/core';
import { Pais } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
    `
    button {
      margin-right: 5px;
    }
    `
  ]
})
export class PorRegionComponent {

  regiones: string[] = ['africa','americas', 'asia', 'europe', 'oceania'];
  regionActiva: string = '';
  region : string = '';
  listaPaises: Pais[] = [];

  constructor(private paisService: PaisService) { }

  getClaseCss (region: string) {
    return (this.regionActiva === region) ? 'btn btn-primary': 'btn btn-outline-primary';
  }

  activarRegion (region: string){
    
    if (region === this.regionActiva) {return;}

    this.regionActiva = region;
    this.listaPaises = [];

        //OJO .. para que se ejecute el consumo, debe existir un suscribe. 
    //suscribe maneja 3 argumentos: 
    //next-corresponde al registro encontrado, 
    //error-corresponde a la captura del error en el momento de la respuesta, 
    //complete-corresponde a la finalización de la operación
    this.paisService.buscarPaisxRegion(region)
    .subscribe( (paises) => {      
      this.listaPaises = paises.sort(this.SortArray);
      })
  }

  SortArray(x:Pais, y:Pais){
    if (x.name.common < y.name.common) {return -1;}
    if (x.name.common > y.name.common) {return 1;}
    return 0;
  }
}
