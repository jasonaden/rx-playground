
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Subject} from 'rxjs'; // NOTE: Importing from rxjs/Subject (through compat layer) produces typing errors
import {map, scan, delay} from 'rxjs/operators';

import * as Rx from 'rxjs/Rx';

import 'rxjs/add/operator/buffer';

import {Observable} from 'rxjs/internal/Observable';

let x: Rx.Observable<any>;

// import {Subject} from 'rxjs/Subject';
// import {map, scan, delay} from 'rxjs/operators/index';
// import {scan} from 'rxjs/operators/scan';
// import {map} from 'rxjs/operators/map';
// import {delay} from 'rxjs/operators/delay';

class Hello extends React.Component<{name: string}, {count: number}> {
  subject = new Rx.Subject<React.SyntheticEvent<HTMLElement>>();

  constructor() {
    super();
    this.state = {count: 0};

    let evt: React.MouseEvent<any>;
    this.subject.pipe(
      Rx.operators.map(ev => +1),
      Rx.operators.scan((acc, x) => acc+x, 0),
      Rx.operators.delay(1000)
    ).subscribe(x => this.setState({count: x} as any));
  }

  render() {
    return (
      <div onClick={ev => this.subject.next(ev)}>
        {`${this.state.count} Hello ${this.props.name}`}
      </div>
    )
  }
}

ReactDOM.render(<Hello name="Egghead" />, document.querySelector('#app'));