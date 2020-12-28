import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  public intervalSubs: Subscription;

  constructor() {

    // this.retornaObservable().pipe(
    //   retry(3)
    // ).subscribe(
    //   (valor) => console.log('Subs: ', valor),
    //   (error) => console.warn('Error: ', error),
    //   () => console.log('Obs$ Terminado')

    // );
    this.intervalSubs = this.reetornaIntervalo().subscribe( console.log );

  }

  reetornaIntervalo(): Observable<number> {

    return interval(100)
    .pipe(
      take(10),
      map( valor => valor + 1 ),
      filter( valor => ( valor % 2 === 0) ? true : false )
    );
  }

  retornaObservable() {
    let i = -1;

    const obs$ = new Observable<number>( ( observer ) => {

      const intervalo = setInterval( () => {

        i++;
        observer.next(i);

        if (i === 5) {
          clearInterval( intervalo );
          observer.complete();
        }

        if (i === 3) {
          console.log('i es igual a 3.... error!!');

          observer.error('El observer llego a 2');
        }

      }, 1000);
    });
    return obs$;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.intervalSubs.unsubscribe();
  }

}
