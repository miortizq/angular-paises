import { Component, Input } from '@angular/core';
import { Pais } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-pais-tabla',
  templateUrl: './pais-tabla.component.html',
  styles: [
  ]
})
export class PaisTablaComponent {

  //Se define un decorador @Input para enviar la información de la lista a pais-tabla
  @Input() arregloPaises: Pais[] = [];

  constructor() { }

}
