import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: []
})
export class Grafica1Component {

  public labels = ['Ventas', 'pedidos', 'Cambios'];
  public data = [
    [100, 100, 200]
  ];

}
