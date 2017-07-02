
const log = console.log.bind(console);
import { Observable, Observer, Subject, BehaviorSubject, ReplaySubject, Subscription } from 'rxjs';
import './hello.tsx';

let timer$ = Observable.interval(500)
  .do(x => log('source ' + x))
  .share();

const obsA = {
  next: (x: any) => log('A next: ' + x),
  error: (err: Error) => log('A error: ' + err.message),
  complete: () => log('A complete')
};

const obsB = {
  next: (x: any) => log('B next: ' + x),
  error: (err: Error) => log('B error: ' + err.message),
  complete: () => log('B complete')
}

let subA: Subscription;
let subB: Subscription;

setTimeout(() => {
  subA = timer$.subscribe(obsA);
  log('ObsA Subscribed');
}, 3000);

setTimeout(() => {
  subB = timer$.subscribe(obsB)
  log('ObsB Subscribed');
}, 2000)

setTimeout(() => {
  subA.unsubscribe();
  subB.unsubscribe();
}, 5000);

setTimeout(() => {
  subA = timer$.subscribe(obsA)
}, 10000);