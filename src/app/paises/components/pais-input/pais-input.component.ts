import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [
  ]
})
export class PaisInputComponent implements OnInit{

  termino: string = ''; 
  
  //Se define un decorador @Input para enviar la información del placeHolder de la caja de texto
  @Input() placeHolder: string = "";

  //Se va a emitir la propiedad 'termino' bajo la especificación de un evento (onEnter) cuando se da
  //enter en la caja de Input
  //Se especifica el decorador @Output
  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  //Se va a emitir la propiedad 'termino' bajo la especificación de un evento (onDebounce) cuando 
  //se deja de escribir en la caja de Input
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  
  //Se especifica un observador utilizando subject
  dbouncer: Subject<string> = new Subject();
  
  constructor() { }

  //El metodo onInit hace parte del ciclo de vida del componente y se dispara una unica vez cuando 
  //el componente es inicializado
  //En el observador dbouncer se implementa el suscribe para acceder a todas las propiedades del 
  //observador y es desde este punto que se emite el valor digitado en el input.
  //Adicionalmente se implementa el debounceTime en un atributo pipe para especificar el tiempo 
  //en milisegs que se va tardar en presentar datos despues de dejar de teclear 
  ngOnInit() {
    this.dbouncer
      .pipe(debounceTime(500))
      .subscribe( valor => {
        this.onDebounce.emit(valor);
      })
  }

  buscar(){
    //Está emitiendo el valor de la propiedad termino, definida anteriormente
    this.onEnter.emit(this.termino);
  };

  //Cada vez que una tecla es presionada en la caja, se activa el evento Input en el html y este 
  //dispara la funcion teclaPresionada. El observador va emitiendo el siguiente valor de la 
  //informacion tecleada
  teclaPresionada() {
    this.dbouncer.next(this.termino);
  }
}
