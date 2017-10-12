/** PURE_IMPORTS_START rxjs_operators_index PURE_IMPORTS_END */
const log = console.log.bind(console);


import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {map} from 'rxjs/operators/index';
// import {map} from 'rxjs/operators/map';

function observer(marker: string = '') {
  return {
    next: (x: any) => log(`${marker} next: ${x}`),
    error: (err: Error) => log(`${marker} error: ${err.message}`),
    complete: () => log(`${marker} complete`)
  }
};


class Hello {
  subject = new Subject<number>();

  constructor() {

    this.subject.pipe(
      map(ev => +1)
    ).subscribe(x => console.log(x));
  }

}

export const helloWorld = new Hello();

helloWorld.subject.next(1);

console.log(helloWorld);

