import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PorPaisComponent } from './paises/pages/por-pais/por-pais.component';
import { PorRegionComponent } from './paises/pages/por-region/por-region.component';
import { PorCapitalComponent } from './paises/pages/por-capital/por-capital.component';
import { VerPaisComponent } from './paises/pages/ver-pais/ver-pais.component';

//Se define un arreglo de tipo Routes dónde se especifican las rutas principales de la solución
//La ruta definida como un path='' identifica la raiz. La ruta inicial. 
//A la ruta inicial se le asocia el parámetro pathMach=full
const routes: Routes = [
    {
        path: '',
        component: PorPaisComponent,
        pathMatch: 'full'
    },
    {
        path: 'region',
        component: PorRegionComponent
    },
    {
        path: 'capital',
        component: PorCapitalComponent
    },
    {
        path: 'alpha/:id',
        component: VerPaisComponent
    },
    {
        path: '**',
        redirectTo: ''
    }];

//Se crea clase para definir los componentes que deben ser presentados de acuerdo a las rutas 
//Se importa el RouterModule.forRoot para que configuren las rutas principales. 
//Solo existe un único forRoot
//Se exporta el RouterModule para que pueda ser visto por toda la aplciación
@NgModule({
    exports:[
        RouterModule
    ],
    imports: [
        RouterModule.forRoot(routes)
    ]
})
export class AppRoutingModule {

    


}